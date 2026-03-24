import { useMemo, useState } from 'react';
import { quickRefLegend, quickRefPhase1Nodes } from './quickRefData';

type QuickRefSectionProps = {
  searchValue: string;
  onNavigate: (section: string) => void;
};

function normalize(value: string) {
  return value.trim().toLowerCase();
}

export function QuickRefSection({ searchValue, onNavigate }: QuickRefSectionProps) {
  const [openIndexes, setOpenIndexes] = useState<number[]>([0, 1, 2]);
  const [locked, setLocked] = useState(false);
  const query = normalize(searchValue);

  const visibleNodes = useMemo(() => {
    if (!query) return quickRefPhase1Nodes;
    return quickRefPhase1Nodes.filter((node) => normalize(`${node.title} ${node.body}`).includes(query));
  }, [query]);

  function toggleNode(index: number) {
    setOpenIndexes((current) =>
      current.includes(index) ? current.filter((item) => item !== index) : [...current, index],
    );
  }

  return (
    <section className="section-shell section-shell-quickref">
      <div className="section-header react-section-header">
        <div className="phase-badge" style={{ background: '#dbeafe', color: '#1d4ed8' }}>
          SCRIPT
        </div>

        <div className="react-section-heading-wrap">
          <div className="section-title">Quick Reference Call Script</div>
          <button type="button" className="heading-note-btn" disabled>
            ✦ Add note
          </button>
          <div className="section-subtitle">
            Interactive decision-tree flowchart — click any node for full script · links jump between phases
          </div>
        </div>

        <button
          type="button"
          className={`section-lock-btn-react${locked ? ' locked' : ''}`}
          onClick={() => setLocked((value) => !value)}
        >
          {locked ? 'Unlock section' : 'Lock section'}
        </button>
      </div>

      <div className="qrf-legend react-qrf-legend">
        {quickRefLegend.map((item) => (
          <span key={item.label}>
            <i style={{ background: item.color }} />
            {item.label}
          </span>
        ))}
      </div>

      <div className="qrf-wrap react-qrf-wrap">
        <div className="qrf-ph ph1">P1 · Opening & Authentication</div>

        {visibleNodes.length === 0 ? (
          <div className="react-empty-state">No quick-reference matches for “{searchValue}”.</div>
        ) : (
          visibleNodes.map((node, index) => {
            const realIndex = quickRefPhase1Nodes.findIndex((item) => item.title === node.title);
            const isOpen = openIndexes.includes(realIndex);

            return (
              <div className="react-qrf-node-stack" key={node.title}>
                <button
                  type="button"
                  className={`qrf-node ${node.type === 'script' ? 'sc' : 'nt'}${isOpen ? ' open' : ''}`}
                  onClick={() => toggleNode(realIndex)}
                >
                  <div className="qrf-nh">
                    <span className="qrf-ico">{node.icon}</span>
                    <span className="qrf-ttl">{node.title}</span>
                    <span className="qrf-chv">▸</span>
                  </div>
                  <div className="qrf-nb">{node.body}</div>
                </button>
                <div className="qrf-line solid" />
              </div>
            );
          })
        )}

        <div className="qrf-dec react-qrf-decision">
          <div className="qrf-dw">
            <div className="qrf-d">
              <div className="qrf-di">Identity verified?</div>
            </div>
          </div>
          <div className="qrf-split">
            <div className="qrf-br y">
              <span className="qrf-btg y">YES</span>
              <span className="qrf-btx">“Thank you, I&apos;ve verified your account.”</span>
              <button type="button" className="qrf-goto" onClick={() => onNavigate('p2')}>
                → Phase 2
              </button>
            </div>
            <div className="qrf-br n">
              <span className="qrf-btg n">NO</span>
              <span className="qrf-btx">
                Try one more identifier. If it still fails: “I&apos;m sorry, I&apos;m unable to verify this
                account. Please call back with your Merchant ID.”
              </span>
              <span className="qrf-end">⛔ End Call</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
