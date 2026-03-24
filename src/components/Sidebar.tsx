import { navGroups } from './layoutData';

type SidebarProps = {
  activeSection: string;
  onNavigate: (section: string) => void;
};

export function Sidebar({ activeSection, onNavigate }: SidebarProps) {
  return (
    <aside id="sidebar" className="bridge-sidebar">
      <div id="sidebar-header">
        <span className="logo">PCI Helpdesk</span>
        <div className="title">Agent Reference</div>
      </div>

      <nav>
        {navGroups.map((group) => (
          <div className="nav-group" key={group.label}>
            <span className="nav-group-label">{group.label}</span>
            {group.items.map((item) => {
              const isActive = activeSection === item.key;
              return (
                <div
                  key={item.key}
                  className={`nav-item${isActive ? ' active' : ''}`}
                  onClick={() => onNavigate(item.key)}
                  style={isActive && item.activeBorderColor ? { borderLeftColor: item.activeBorderColor } : undefined}
                >
                  <span className="phase-dot" style={{ background: item.dotColor }} />
                  {item.label}
                  {item.badge ? (
                    <span className="badge" style={item.badgeStyle}>
                      {item.badge}
                    </span>
                  ) : null}
                </div>
              );
            })}
          </div>
        ))}
      </nav>
    </aside>
  );
}
