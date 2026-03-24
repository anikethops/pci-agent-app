type RightRailProps = {
  onOpenPanel: (name: 'search' | 'bookmarks' | 'backup' | 'history') => void;
  onTrigger: (action: 'builder' | 'note' | 'locator') => void;
};

export function RightRail({ onOpenPanel, onTrigger }: RightRailProps) {
  return (
    <div className="workspace-fab-stack bridge-right-rail">
      <button className="bld-fab bridge-builder-btn" type="button" onClick={() => onTrigger('builder')}>
        ✏ Builder
      </button>
      <button className="workspace-fab" type="button" onClick={() => onOpenPanel('search')}>
        🔎 Search
      </button>
      <button className="workspace-fab" type="button" onClick={() => onOpenPanel('bookmarks')}>
        🔖 Bookmarks
      </button>
      <button className="workspace-fab" type="button" onClick={() => onOpenPanel('backup')}>
        💾 Backups
      </button>
      <button className="workspace-fab" type="button" onClick={() => onOpenPanel('history')}>
        🕘 History
      </button>
      <button className="workspace-fab" type="button" onClick={() => onTrigger('note')}>
        📌 Place Floating Note
      </button>
      <button className="workspace-fab" type="button" onClick={() => onTrigger('locator')}>
        🗂 Locate Notes
      </button>
    </div>
  );
}
