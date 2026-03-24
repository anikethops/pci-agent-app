import { phasePills } from './layoutData';

type TopBarProps = {
  activeSection: string;
  searchValue: string;
  onSearchChange: (value: string) => void;
  onNavigate: (section: string) => void;
  onSignOut: () => void;
};

export function TopBar({ activeSection, searchValue, onSearchChange, onNavigate, onSignOut }: TopBarProps) {
  return (
    <div id="topbar" className="bridge-topbar" style={{ flexWrap: 'wrap', gap: 8 }}>
      <span className="topbar-title">PCI Helpdesk — Inbound Call Reference</span>
      <span className="topbar-sep">|</span>

      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {phasePills.map((pill) => (
          <span
            key={pill.key}
            className={`phase-pill${activeSection === pill.key ? ' active' : ''}`}
            style={{ color: pill.color, borderColor: pill.color, opacity: activeSection === pill.key ? 1 : undefined }}
            onClick={() => onNavigate(pill.key)}
          >
            {pill.label}
          </span>
        ))}
      </div>

      <div className="bridge-topbar-spacer" />

      <div id="search-wrap" className="bridge-search-wrap">
        <input
          id="search-input"
          type="text"
          placeholder="🔍 Search anything..."
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <button id="react-bridge-signout" type="button" onClick={onSignOut}>
        Sign Out
      </button>
    </div>
  );
}
