import type { NoteRecord, SectionRecord } from '../types/app';

interface SectionCardProps {
  section: SectionRecord;
  notes: NoteRecord[];
  builderMode: boolean;
  onUpdateSection: (sectionId: string, patch: Partial<SectionRecord>) => void;
  onToggleLock: (sectionId: string, locked: boolean) => void;
  onAddBookmark: (section: SectionRecord) => void;
  onCreateNote: (section: SectionRecord) => void;
}

export function SectionCard({ section, notes, builderMode, onUpdateSection, onToggleLock, onAddBookmark, onCreateNote }: SectionCardProps) {
  return (
    <section className="section-card" id={section.id}>
      <div className="section-card-header">
        <div>
          {builderMode ? (
            <input className="section-title-input" value={section.title} onChange={(e) => onUpdateSection(section.id, { title: e.target.value })} />
          ) : (
            <h2>{section.title}</h2>
          )}
          {builderMode ? (
            <input className="section-subtitle-input" value={section.subtitle} onChange={(e) => onUpdateSection(section.id, { subtitle: e.target.value })} />
          ) : (
            <p>{section.subtitle}</p>
          )}
        </div>
        <div className="section-actions">
          <button onClick={() => onToggleLock(section.id, !section.locked)}>{section.locked ? 'Unlock' : 'Lock'}</button>
          <button onClick={() => onAddBookmark(section)}>Bookmark</button>
          <button onClick={() => onCreateNote(section)}>Add Note</button>
        </div>
      </div>

      {builderMode && !section.locked ? (
        <textarea className="section-content-editor" value={section.content} onChange={(e) => onUpdateSection(section.id, { content: e.target.value })} />
      ) : (
        <div className="section-content">{section.content}</div>
      )}

      {notes.length > 0 && (
        <div className="note-list">
          {notes.map((note) => (
            <div key={note.id} className="note-item">
              <div className="note-head">
                <strong>{note.anchor_title || 'Floating note'}</strong>
                <span>{note.status}</span>
              </div>
              <div className="note-body" dangerouslySetInnerHTML={{ __html: note.note_html }} />
              <div className="note-tags">{note.tags.join(', ')}</div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
