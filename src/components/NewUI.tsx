import { Search, Bookmark, Save, StickyNote } from "lucide-react";
import "./newui.css";

export default function NewUI() {
  return (
    <div className="app">
      <aside className="sidebar">
        <h2 className="logo">PCI HELPDESK</h2>
        <h1 className="title">Agent Reference Web App</h1>

        <div className="menu">
          <p className="section-title">CORE</p>
          <button className="menu-item active">Overview</button>
          <button className="menu-item">Checklist</button>

          <p className="section-title">CALL SCRIPTS</p>
          <button className="menu-item">Scenario Scripts</button>
          <button className="menu-item">Action Guide</button>

          <p className="section-title">REFERENCE</p>
          <button className="menu-item">SAQ Reference</button>
          <button className="menu-item">SAQ Study Notes</button>
        </div>
      </aside>

      <main className="main">
        <header className="header">
          <h2>PCI Helpdesk — Agent Reference Web App</h2>
        </header>

        <h1>Overview</h1>

        <div className="card blue">
          Core flow content
        </div>

        <div className="card green">
          Internal guidance
        </div>

        <div className="card yellow">
          Decision section
        </div>
      </main>

      <div className="floating">
        <button><Search size={18}/> Search</button>
        <button><Bookmark size={18}/> Bookmarks</button>
        <button><Save size={18}/> Backups</button>
        <button><StickyNote size={18}/> History</button>
      </div>
    </div>
  );
}