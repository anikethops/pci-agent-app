import type { SectionRecord } from '../types/app';

interface LeftSidebarProps {
  sections: SectionRecord[];
  activeSectionId: string | null;
  onSelect: (id: string) => void;
  onAddSection: () => void;
}

export function LeftSidebar({ sections, activeSectionId, onSelect, onAddSection }: LeftSidebarProps) {
  const groups = Array.from(new Set(sections.map((s) => s.category)));

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-logo">PCI Helpdesk</div>
        <div className="sidebar-title">Agent Reference Web App</div>
      </div>
      <div className="sidebar-body">
        {groups.map((group) => (
          <div key={group} className="nav-group">
            <div className="nav-group-label">{group}</div>
            {sections.filter((s) => s.category === group).map((section) => (
              <button
                key={section.id}
                className={`nav-item ${activeSectionId === section.id ? 'active' : ''}`}
                onClick={() => onSelect(section.id)}
              >
                <span>{section.title}</span>
                <span className="nav-badge">§{section.position}</span>
              </button>
            ))}
          </div>
        ))}
      </div>
      <div className="sidebar-footer">
        <button onClick={onAddSection}>+ New Section</button>
      </div>
    </aside>
  );
}
