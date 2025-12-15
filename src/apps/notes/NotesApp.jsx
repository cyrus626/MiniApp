import { useState, useEffect } from "react";
import Editor from "./Editor";
import Sidebar from "./Sidebar";
import "../../index.css";

export default function NotesApp() {
  const [notes, setNotes] = useState([]);
  const [current, setCurrent] = useState(null);
  const [search, setSearch] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Load from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("notes-app"));
    if (saved) setNotes(saved);
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("notes-app", JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    const newNote = {
      id: Date.now(),
      title: "",
      body: "",
      date: new Date().toISOString()
    };
    setNotes([newNote, ...notes]);
    setCurrent(newNote);
  };

  const updateNote = (id, field, value) => {
    setNotes(notes.map(n =>
      n.id === id ? { ...n, [field]: value } : n
    ));
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(n => n.id !== id));
    if (current?.id === id) setCurrent(null);
  };

  const filteredNotes = notes.filter(n =>
    n.title.toLowerCase().includes(search.toLowerCase()) ||
    n.body.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex overflow-hidden h-screen">
      <Sidebar
        notes={filteredNotes}
        setCurrent={setCurrent}
        addNote={addNote}
        search={search}
        setSearch={setSearch}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      <button
        onClick={() => setSidebarOpen(true)}
        className="md:hidden mb-3 px-4 
        bg-gray-800 text-white rounded-lg">
        |||
      </button>
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="
            fixed inset-0
            bg-black/40
            z-30
            md:hidden
          "
        />
      )}

      <Editor
        current={current}
        updateNote={updateNote}
        deleteNote={deleteNote}
      />
    </div>
  );
}
