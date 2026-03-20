import type { BookmarkRecord, HistoryRecord, NoteRecord, PanelType, SectionRecord, SnapshotRecord } from '../types/app';

interface WorkspacePanelsProps {
  openPanel: PanelType | null;
  setOpenPanel: (panel: PanelType | null) => void;
  searchText: string;
  setSearchText: (value: string) => void;
  searchType: 'all' | 'notes' | 'content' | 'bookmarks';
  setSearchType: (value: 'all' | 'notes' | 'content' | 'bookmarks') => void;
  sections: SectionRecord[];
  notes: NoteRecord[];
  bookmarks: BookmarkRecord[];
  snapshots: SnapshotRecord[];
  history: HistoryRecord[];
  onJumpToSection: (id: string) => void;
  onRestoreSnapshot: (snapshotId: string) => void;
}

export function WorkspacePanels(props: WorkspacePanelsProps) {
  const {
    openPanel,
    setOpenPanel,
    searchText,
    setSearchText,
    searchType,
    setSearchType,
    sections,
    notes,
    bookmarks,
    snapshots,
    history,
    onJumpToSection,
    onRestoreSnapshot,
  } = props;

  const q = searchText.trim().toLowerCase();
  const results = !q
    ? []
    : [
        ...(searchType === 'all' || searchType === 'content'
          ? sections
              .filter((s) => `${s.title} ${s.subtitle} ${s.content}`.toLowerCase().includes(q))
              .map((s) => ({ id: s.id, title: s.title, kind: 'section', preview: s.subtitle }))
          : []),
        ...(searchType === 'all' || searchType === 'notes'
          ? notes
              .filter((n) => `${n.anchor_title} ${n.note_html} ${n.status} ${n.tags.join(' ')}`.toLowerCase().includes(q))
              .map((n) => ({ id: n.section_id, title: n.anchor_title || 'Floating note', kind: 'note', preview: n.note_html.replace(/<[^>]+>/g, '').slice(0, 100) }))
          : []),
        ...(searchType === 'all' || searchType === 'bookmarks'
          ? bookmarks
              .filter((b) => `${b.label}`.toLowerCase().includes(q))
              .map((b) => ({ id: b.section_id, title: b.label, kind: 'bookmark', preview: 'Saved bookmark' }))
          : []),
      ];

  return (
    <>
      <div className="workspace-fab-stack">
        <button onClick={() => setOpenPanel(openPanel === 'search' ? null : 'search')}>🔎 Search</button>
        <button onClick={() => setOpenPanel(openPanel === 'bookmarks' ? null : 'bookmarks')}>🔖 Bookmarks</button>
        <button onClick={() => setOpenPanel(openPanel === 'backups' ? null : 'backups')}>💾 Backups</button>
        <button onClick={() => setOpenPanel(openPanel === 'history' ? null : 'history')}>🕘 History</button>
      </div>

      {openPanel && (
        <div className="workspace-panel">
          <div className="workspace-panel-header">
            <div>
              <div className="workspace-title">{openPanel === 'search' ? 'Global Search' : openPanel === 'bookmarks' ? 'Bookmarks' : openPanel === 'backups' ? 'Backups & Snapshots' : 'History'}</div>
              <div className="workspace-subtitle">
                {openPanel === 'search' && 'Search notes, bookmarks, titles, subtitles, and content from one place.'}
                {openPanel === 'bookmarks' && 'Jump straight to saved sections.'}
                {openPanel === 'backups' && 'Restore a saved workspace snapshot.'}
                {openPanel === 'history' && 'Recent workspace changes and autosave events.'}
              </div>
            </div>
            <button className="plain-close" onClick={() => setOpenPanel(null)}>✕</button>
          </div>

          {openPanel === 'search' && (
            <div className="workspace-panel-body">
              <div className="workspace-row">
                <input value={searchText} onChange={(e) => setSearchText(e.target.value)} placeholder="Search the whole workspace" />
                <select value={searchType} onChange={(e) => setSearchType(e.target.value as 'all' | 'notes' | 'content' | 'bookmarks')}>
                  <option value="all">All</option>
                  <option value="notes">Notes</option>
                  <option value="content">Content</option>
                  <option value="bookmarks">Bookmarks</option>
                </select>
              </div>
              <div className="workspace-list">
                {!q && <div className="workspace-empty">Start typing to search the entire document and all floating notes.</div>}
                {q && results.length === 0 && <div className="workspace-empty">No results found.</div>}
                {results.map((item, index) => (
                  <button key={`${item.kind}-${index}`} className="workspace-list-item" onClick={() => onJumpToSection(item.id)}>
                    <div className="workspace-list-title">{item.title}</div>
                    <div className="workspace-list-sub">{item.kind} · {item.preview}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {openPanel === 'bookmarks' && (
            <div className="workspace-panel-body workspace-list">
              {bookmarks.length === 0 && <div className="workspace-empty">No bookmarks yet.</div>}
              {bookmarks.map((bookmark) => (
                <button key={bookmark.id} className="workspace-list-item" onClick={() => onJumpToSection(bookmark.section_id)}>
                  <div className="workspace-list-title">{bookmark.label}</div>
                </button>
              ))}
            </div>
          )}

          {openPanel === 'backups' && (
            <div className="workspace-panel-body workspace-list">
              {snapshots.length === 0 && <div className="workspace-empty">No snapshots yet.</div>}
              {snapshots.map((snapshot) => (
                <div key={snapshot.id} className="workspace-list-item static-item">
                  <div className="workspace-list-title">{snapshot.label}</div>
                  <div className="workspace-list-sub">{snapshot.created_at}</div>
                  <button className="inline-action" onClick={() => onRestoreSnapshot(snapshot.id)}>Restore</button>
                </div>
              ))}
            </div>
          )}

          {openPanel === 'history' && (
            <div className="workspace-panel-body workspace-list">
              {history.length === 0 && <div className="workspace-empty">No history yet.</div>}
              {history.map((entry) => (
                <div key={entry.id} className="workspace-list-item static-item">
                  <div className="workspace-list-title">{entry.label}</div>
                  <div className="workspace-list-sub">{entry.type} · {entry.created_at}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
