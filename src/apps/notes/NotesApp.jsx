import { useState, useEffect } from "react";
import Editor from "./editor";
import Sidebar from "./Sidebar";
import "./notes.css";

export default function NotesApp() {
  const [notes, setNotes] = useState([]);
  const [current, setCurrent] = useState(null);
  const [search, setSearch] = useState("");

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
    <div className="notes-container">
      <Sidebar
        notes={filteredNotes}
        setCurrent={setCurrent}
        addNote={addNote}
        search={search}
        setSearch={setSearch}
      />

      <Editor
        current={current}
        updateNote={updateNote}
        deleteNote={deleteNote}
      />
    </div>
  );
}
