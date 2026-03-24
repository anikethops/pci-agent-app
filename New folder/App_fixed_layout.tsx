import React, { useEffect, useMemo, useRef, useState } from 'react';
import referenceHtmlRaw from './reference.html?raw';
import { supabase } from './lib/supabase';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { RightRail } from './components/RightRail';
import './layout-shell.css';

type SessionUser = {
  id: string;
  email: string;
};

type BridgeMessage =
  | { type: 'pci-helpdesk-signout' }
  | { type: 'pci-helpdesk-section-change'; section: string };

function patchReferenceHtml(html: string) {
  const bridgeStyles = `
#sidebar,
#topbar,
#note-toolbar,
#workspace-fab-stack,
#bld-fab,
#bld-sidebar-footer,
#react-bridge-signout {
  display: none !important;
}
body {
  display: block !important;
  background: transparent !important;
  min-height: auto !important;
  overflow-x: hidden !important;
}
#main {
  margin-left: 0 !important;
  min-height: auto !important;
}
#content {
  padding: 0 !important;
}
.section {
  max-width: 920px !important;
}
.workspace-fab-stack,
.workspace-panel {
  display: none !important;
}
`;

  const bridgeScript = `
<script>
(function () {
  function notifySection() {
    try {
      var sec = (typeof activeSection === 'function' && activeSection()) || document.querySelector('.section.active') || document.querySelector('.section');
      var id = sec && sec.id ? sec.id.replace(/^section-/, '') : 'checklist';
      window.parent.postMessage({ type: 'pci-helpdesk-section-change', section: id }, '*');
    } catch (e) {}
  }

  function callShow(section) {
    if (typeof window.show === 'function') {
      window.show(section);
      setTimeout(notifySection, 0);
    }
  }

  function clickBySelector(selector) {
    var el = document.querySelector(selector);
    if (el) el.click();
  }

  window.addEventListener('message', function (event) {
    var data = event.data || {};
    if (data.type === 'pci-helpdesk-show-section' && data.section) {
      callShow(data.section);
    }
    if (data.type === 'pci-helpdesk-search') {
      if (typeof window.doSearch === 'function') window.doSearch(data.query || '');
    }
    if (data.type === 'pci-helpdesk-clear-search') {
      if (typeof window.clearSearch === 'function') window.clearSearch();
    }
    if (data.type === 'pci-helpdesk-open-panel' && data.panel) {
      clickBySelector('[data-open-panel="' + data.panel + '"]');
    }
    if (data.type === 'pci-helpdesk-trigger' && data.action === 'builder') {
      clickBySelector('#bld-fab');
    }
    if (data.type === 'pci-helpdesk-trigger' && data.action === 'note') {
      clickBySelector('#global-note-arm-btn');
    }
    if (data.type === 'pci-helpdesk-trigger' && data.action === 'locator') {
      clickBySelector('#note-locator-btn');
    }
  });

  var originalShow = window.show;
  if (typeof originalShow === 'function' && !window.__pciBridgeWrappedShow) {
    window.show = function () {
      var result = originalShow.apply(this, arguments);
      setTimeout(notifySection, 0);
      return result;
    };
    window.__pciBridgeWrappedShow = true;
  }

  window.addEventListener('load', function () {
    setTimeout(notifySection, 60);
  });

  setTimeout(notifySection, 120);
})();
<\/script>`;

  let output = html;

  if (output.includes('</style>')) {
    output = output.replace('</style>', `${bridgeStyles}\n</style>`);
  }

  if (!output.includes('__pciBridgeWrappedShow')) {
    output = output.replace('</body>', `${bridgeScript}\n</body>`);
  }

  return output;
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<SessionUser | null>(null);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authMessage, setAuthMessage] = useState('');
  const [authBusy, setAuthBusy] = useState(false);
  const [activeSection, setActiveSection] = useState('checklist');
  const [searchValue, setSearchValue] = useState('');
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    let mounted = true;

    supabase.auth.getSession().then(({ data, error }) => {
      if (!mounted) return;
      if (error) setAuthMessage(error.message);
      const sessionUser = data.session?.user;
      setUser(sessionUser ? { id: sessionUser.id, email: sessionUser.email || '' } : null);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const sessionUser = session?.user;
      setUser(sessionUser ? { id: sessionUser.id, email: sessionUser.email || '' } : null);
      setLoading(false);
    });

    const onMessage = (event: MessageEvent) => {
      const data = event.data as BridgeMessage | undefined;
      if (!data || typeof data !== 'object' || !('type' in data)) return;

      if (data.type === 'pci-helpdesk-signout') {
        void handleSignOut();
        return;
      }

      if (data.type === 'pci-helpdesk-section-change' && typeof data.section === 'string') {
        setActiveSection(data.section);
      }
    };

    window.addEventListener('message', onMessage);

    return () => {
      mounted = false;
      subscription.unsubscribe();
      window.removeEventListener('message', onMessage);
    };
  }, []);

  useEffect(() => {
    const frame = iframeRef.current;
    if (!frame?.contentWindow) return;
    frame.contentWindow.postMessage({ type: 'pci-helpdesk-search', query: searchValue }, '*');
  }, [searchValue]);

  const referenceHtml = useMemo(() => patchReferenceHtml(referenceHtmlRaw), []);

  function postToIframe(payload: Record<string, unknown>) {
    iframeRef.current?.contentWindow?.postMessage(payload, '*');
  }

  function handleNavigate(section: string) {
    setActiveSection(section);
    postToIframe({ type: 'pci-helpdesk-show-section', section });
  }

  function handleOpenPanel(name: 'search' | 'bookmarks' | 'backup' | 'history') {
    postToIframe({ type: 'pci-helpdesk-open-panel', panel: name });
  }

  function handleTrigger(action: 'builder' | 'note' | 'locator') {
    postToIframe({ type: 'pci-helpdesk-trigger', action });
  }

  async function handleAuthSubmit(e: React.FormEvent) {
    e.preventDefault();
    setAuthBusy(true);
    setAuthMessage('');

    try {
      if (authMode === 'signin') {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        setAuthMessage('Account created. Check your email if confirmation is enabled, then sign in.');
        setAuthMode('signin');
      }
    } catch (error) {
      setAuthMessage(error instanceof Error ? error.message : 'Authentication failed.');
    } finally {
      setAuthBusy(false);
    }
  }

  async function handleSignOut() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      setAuthMessage(error.message);
      return;
    }
    setUser(null);
  }

  if (loading) {
    return <div className="app-loading">Loading PCI Helpdesk…</div>;
  }

  if (!user) {
    return (
      <div className="auth-wrap">
        <form className="auth-card" onSubmit={handleAuthSubmit}>
          <div className="auth-kicker">PCI Helpdesk</div>
          <h1>Agent Reference Web App</h1>
          <p>This version moves the outer app shell into React while keeping the full HTML content renderer intact inside the workspace.</p>

          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />

          {authMessage ? <div className="auth-message">{authMessage}</div> : null}

          <div className="auth-actions">
            <button type="submit" disabled={authBusy}>
              {authBusy ? 'Please wait…' : authMode === 'signin' ? 'Sign In' : 'Create Account'}
            </button>
            <button
              type="button"
              onClick={() => {
                setAuthMode((prev) => (prev === 'signin' ? 'signup' : 'signin'));
                setAuthMessage('');
              }}
            >
              {authMode === 'signin' ? 'Switch to Sign Up' : 'Switch to Sign In'}
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="bridge-shell">
      <Sidebar activeSection={activeSection} onNavigate={handleNavigate} />

      <div className="bridge-main-shell">
        <TopBar
          activeSection={activeSection}
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          onNavigate={handleNavigate}
          onSignOut={() => void handleSignOut()}
        />

        <div className="bridge-work-area">
          <div className="bridge-iframe-wrap">
            <iframe
              ref={iframeRef}
              title="PCI Helpdesk Reference"
              srcDoc={referenceHtml}
              className="bridge-content-frame"
            />
          </div>

          <RightRail onOpenPanel={handleOpenPanel} onTrigger={handleTrigger} />
        </div>
      </div>
    </div>
  );
}
