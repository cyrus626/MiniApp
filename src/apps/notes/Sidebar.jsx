import "../../index.css";

function Sidebar({ notes, setCurrent, addNote, search, setSearch, sidebarOpen, setSidebarOpen }) {
  return (
    <div className={`fixed md:static w-64 bg-white
        border-r border-b rounded-br-2xl border-gray-200 z-40 
        transform transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0`}>
      <div className="flex justify-between items:center pt-2 pr-2">
        <p className="px-2 py-2 text-lg font-semibold ">Saved Notes</p>
        <button className="bg-gray-800 px-2 py-2 text-3xl
          font-bold rounded-lg text-white" onClick={addNote}>+</button>
      </div>

      <input className="border mx-4 my-3 px-2 py-2
        rounded-lg hover:ring"
        type="text"
        placeholder="Search notes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="p-4 space-y-2 overflow-y-auto">
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
      <button
        onClick={() => setSidebarOpen(false)}
        className="
          md:hidden
          p-3
          text-gray-600
          text-right
          w-full
        ">
        ✕ Close
      </button>

    </div>
  );
}
export default Sidebar;