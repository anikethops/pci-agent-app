export type PanelType = 'search' | 'bookmarks' | 'backups' | 'history';

export type NoteStatus = 'open' | 'in-progress' | 'done';

export interface SectionRecord {
  id: string;
  user_id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  content: string;
  locked: boolean;
  position: number;
  created_at?: string;
  updated_at?: string;
}

export interface NoteRecord {
  id: string;
  user_id: string;
  section_id: string;
  anchor_key: string;
  anchor_title: string;
  note_html: string;
  tags: string[];
  status: NoteStatus;
  position_mode: 'inline' | 'floating';
  x: number | null;
  y: number | null;
  created_at?: string;
  updated_at?: string;
}

export interface BookmarkRecord {
  id: string;
  user_id: string;
  section_id: string;
  label: string;
  created_at?: string;
}

export interface SnapshotRecord {
  id: string;
  user_id: string;
  label: string;
  data: WorkspaceSeed;
  created_at?: string;
}

export interface HistoryRecord {
  id: string;
  user_id: string;
  type: string;
  label: string;
  meta: Record<string, unknown>;
  created_at?: string;
}

export interface WorkspaceSeed {
  sections: Omit<SectionRecord, 'user_id'>[];
}
