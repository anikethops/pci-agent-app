import { useEffect, useMemo, useState } from 'react';
import { AuthGate } from './components/AuthGate';
import { LeftSidebar } from './components/LeftSidebar';
import { SectionCard } from './components/SectionCard';
import { WorkspacePanels } from './components/WorkspacePanels';
import { supabase } from './lib/supabase';
import { loadLocalCache, saveLocalCache } from './lib/storage';
import { seedWorkspace } from './lib/seed';
import type { BookmarkRecord, HistoryRecord, NoteRecord, PanelType, SectionRecord, SnapshotRecord } from './types/app';

interface CacheShape {
  sections: SectionRecord[];
  notes: NoteRecord[];
  bookmarks: BookmarkRecord[];
  snapshots: SnapshotRecord[];
  history: HistoryRecord[];
}

function uuid() {
  return crypto.randomUUID();
}

function now() {
  return new Date().toISOString();
}

export default function App() {
  const [sessionReady, setSessionReady] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [sections, setSections] = useState<SectionRecord[]>([]);
  const [notes, setNotes] = useState<NoteRecord[]>([]);
  const [bookmarks, setBookmarks] = useState<BookmarkRecord[]>([]);
  const [snapshots, setSnapshots] = useState<SnapshotRecord[]>([]);
  const [history, setHistory] = useState<HistoryRecord[]>([]);
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);
  const [builderMode, setBuilderMode] = useState(true);
  const [autosaveLabel, setAutosaveLabel] = useState('Autosave ready');
  const [openPanel, setOpenPanel] = useState<PanelType | null>(null);
  const [searchText, setSearchText] = useState('');
  const [searchType, setSearchType] = useState<'all' | 'notes' | 'content' | 'bookmarks'>('all');

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUserId(data.session?.user.id ?? null);
      setSessionReady(true);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserId(session?.user.id ?? null);
      setSessionReady(true);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!userId) return;
    void loadWorkspace(userId);
  }, [userId]);

  useEffect(() => {
    if (!userId) return;
    const payload: CacheShape = { sections, notes, bookmarks, snapshots, history };
    saveLocalCache(payload);
  }, [userId, sections, notes, bookmarks, snapshots, history]);

  async function loadWorkspace(currentUserId: string) {
    const cache = loadLocalCache<CacheShape>();
    if (cache?.sections?.length) {
      setSections(cache.sections);
      setNotes(cache.notes || []);
      setBookmarks(cache.bookmarks || []);
      setSnapshots(cache.snapshots || []);
      setHistory(cache.history || []);
      setActiveSectionId(cache.sections[0]?.id ?? null);
    }

    const [{ data: sectionRows }, { data: noteRows }, { data: bookmarkRows }, { data: snapshotRows }, { data: historyRows }] = await Promise.all([
      supabase.from('sections').select('*').eq('user_id', currentUserId).order('position'),
      supabase.from('notes').select('*').eq('user_id', currentUserId).order('created_at', { ascending: false }),
      supabase.from('bookmarks').select('*').eq('user_id', currentUserId).order('created_at', { ascending: false }),
      supabase.from('snapshots').select('*').eq('user_id', currentUserId).order('created_at', { ascending: false }),
      supabase.from('change_logs').select('*').eq('user_id', currentUserId).order('created_at', { ascending: false }),
    ]);

    if (!sectionRows || sectionRows.length === 0) {
      const starterSections = seedWorkspace.sections.map((section) => ({ ...section, user_id: currentUserId, created_at: now(), updated_at: now() }));
      const { data: inserted } = await supabase.from('sections').insert(starterSections).select();
      setSections((inserted as SectionRecord[]) || starterSections);
      setActiveSectionId(starterSections[0]?.id ?? null);
    } else {
      setSections(sectionRows as SectionRecord[]);
      setActiveSectionId((sectionRows as SectionRecord[])[0]?.id ?? null);
    }

    setNotes((noteRows as NoteRecord[]) || []);
    setBookmarks((bookmarkRows as BookmarkRecord[]) || []);
    setSnapshots((snapshotRows as SnapshotRecord[]) || []);
    setHistory((historyRows as HistoryRecord[]) || []);
  }

  async function addHistoryEntry(type: string, label: string, meta: Record<string, unknown> = {}) {
    if (!userId) return;
    const record: HistoryRecord = { id: uuid(), user_id: userId, type, label, meta, created_at: now() };
    setHistory((prev) => [record, ...prev].slice(0, 300));
    await supabase.from('change_logs').insert(record);
  }

  function scheduleAutosave(message: string, callback: () => Promise<void> | void) {
    setAutosaveLabel('Saving...');
    window.setTimeout(async () => {
      await callback();
      setAutosaveLabel(message);
    }, 450);
  }

  function jumpToSection(id: string) {
    setActiveSectionId(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  async function updateSection(sectionId: string, patch: Partial<SectionRecord>) {
    setSections((prev) => prev.map((section) => (section.id === sectionId ? { ...section, ...patch, updated_at: now() } : section)));
    scheduleAutosave('All changes saved', async () => {
      await supabase.from('sections').update({ ...patch, updated_at: now() }).eq('id', sectionId);
      await addHistoryEntry('edit', `Updated section: ${patch.title ?? sections.find((s) => s.id === sectionId)?.title ?? 'Section'}`);
    });
  }

  async function toggleLock(sectionId: string, locked: boolean) {
    await updateSection(sectionId, { locked });
  }

  async function addSection() {
    if (!userId) return;
    const position = sections.length + 1;
    const record: SectionRecord = {
      id: uuid(),
      user_id: userId,
      slug: `section-${position}`,
      title: `New Section ${position}`,
      subtitle: 'Edit this subtitle in builder mode',
      category: 'Custom',
      content: 'Add your content here.',
      locked: false,
      position,
      created_at: now(),
      updated_at: now(),
    };
    setSections((prev) => [...prev, record]);
    setActiveSectionId(record.id);
    scheduleAutosave('Section added', async () => {
      await supabase.from('sections').insert(record);
      await addHistoryEntry('section', `Added section: ${record.title}`);
    });
  }

  async function addBookmark(section: SectionRecord) {
    if (!userId) return;
    const exists = bookmarks.some((bookmark) => bookmark.section_id === section.id);
    if (exists) return;
    const record: BookmarkRecord = { id: uuid(), user_id: userId, section_id: section.id, label: section.title, created_at: now() };
    setBookmarks((prev) => [record, ...prev]);
    scheduleAutosave('Bookmark saved', async () => {
      await supabase.from('bookmarks').insert(record);
      await addHistoryEntry('bookmark', `Bookmarked section: ${section.title}`);
    });
  }

  async function createNote(section: SectionRecord) {
    if (!userId) return;
    const text = window.prompt('Enter note text');
    if (!text) return;
    const record: NoteRecord = {
      id: uuid(),
      user_id: userId,
      section_id: section.id,
      anchor_key: section.slug,
      anchor_title: section.title,
      note_html: `<p>${text.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>`,
      tags: ['Important'],
      status: 'open',
      position_mode: 'floating',
      x: null,
      y: null,
      created_at: now(),
      updated_at: now(),
    };
    setNotes((prev) => [record, ...prev]);
    scheduleAutosave('Note saved', async () => {
      await supabase.from('notes').insert(record);
      await addHistoryEntry('note', `Added note in ${section.title}`);
    });
  }

  async function createSnapshot() {
    if (!userId) return;
    const label = window.prompt('Snapshot label', `Manual snapshot ${new Date().toLocaleString()}`);
    if (!label) return;
    const record: SnapshotRecord = {
      id: uuid(),
      user_id: userId,
      label,
      data: { sections: sections.map(({ user_id, ...rest }) => rest) },
      created_at: now(),
    };
    setSnapshots((prev) => [record, ...prev].slice(0, 40));
    scheduleAutosave('Snapshot created', async () => {
      await supabase.from('snapshots').insert(record);
      await addHistoryEntry('snapshot', `Created snapshot: ${label}`);
    });
  }

  async function restoreSnapshot(snapshotId: string) {
    const snapshot = snapshots.find((item) => item.id === snapshotId);
    if (!snapshot || !userId) return;
    const restoredSections = snapshot.data.sections.map((section, index) => ({ ...section, user_id: userId, position: index + 1, updated_at: now() }));
    setSections(restoredSections);
    scheduleAutosave('Snapshot restored', async () => {
      await supabase.from('sections').delete().eq('user_id', userId);
      await supabase.from('sections').insert(restoredSections);
      await addHistoryEntry('restore', `Restored snapshot: ${snapshot.label}`);
    });
  }

  const visibleNotes = useMemo(
    () => notes.reduce<Record<string, NoteRecord[]>>((acc, note) => {
      acc[note.section_id] = [...(acc[note.section_id] || []), note];
      return acc;
    }, {}),
    [notes],
  );

  if (!sessionReady) return <div className="loading-shell">Loading…</div>;
  if (!userId) return <AuthGate />;

  return (
    <div className="app-shell">
      <LeftSidebar sections={sections} activeSectionId={activeSectionId} onSelect={jumpToSection} onAddSection={addSection} />
      <main className="main-shell">
        <header className="topbar">
          <div>
            <div className="topbar-title">PCI Helpdesk — Agent Reference Web App</div>
            <div className="topbar-subtitle">Reference-based starter inspired by the merged HTML layout, workspace FAB panels, autosave pill, bookmarks, backups, and builder workflow.</div>
          </div>
          <div className="topbar-actions">
            <button onClick={() => setBuilderMode((value) => !value)}>{builderMode ? 'Exit Builder' : 'Builder Mode'}</button>
            <button onClick={createSnapshot}>Create Snapshot</button>
            <button onClick={() => supabase.auth.signOut()}>Sign Out</button>
          </div>
        </header>

        <div className="autosave-pill">{autosaveLabel}</div>

        <div className="content-shell">
          {sections.map((section) => (
            <SectionCard
              key={section.id}
              section={section}
              notes={visibleNotes[section.id] || []}
              builderMode={builderMode}
              onUpdateSection={updateSection}
              onToggleLock={toggleLock}
              onAddBookmark={addBookmark}
              onCreateNote={createNote}
            />
          ))}
        </div>
      </main>

      <WorkspacePanels
        openPanel={openPanel}
        setOpenPanel={setOpenPanel}
        searchText={searchText}
        setSearchText={setSearchText}
        searchType={searchType}
        setSearchType={setSearchType}
        sections={sections}
        notes={notes}
        bookmarks={bookmarks}
        snapshots={snapshots}
        history={history}
        onJumpToSection={jumpToSection}
        onRestoreSnapshot={restoreSnapshot}
      />
    </div>
  );
}
