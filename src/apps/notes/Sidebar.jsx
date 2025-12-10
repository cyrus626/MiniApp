import "./notes.css";

function Sidebar({ notes, setCurrent, addNote, search, setSearch }) {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Notes</h2>
        <button onClick={addNote}>+</button>
      </div>

      <input
        type="text"
        placeholder="Search notes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="note-list">
        {notes.map(n => (
          <div
            key={n.id}
            className="note-item"
            onClick={() => setCurrent(n)}
          >
            <strong>{n.title || "Untitled"}</strong>
            <p>{n.body.slice(0, 40)}...</p>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Sidebar;