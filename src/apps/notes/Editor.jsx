import { useEffect, useState } from "react";
import "./notes.css";

function Editor({ current, updateNote, deleteNote }) {
  const [title, setTitle] = useState("");
  const [body, setbody] = useState("");
  
  // When note is selected load into local state
  useEffect(() => {
    if(current){
      setTitle(current.title ?? "");
      setbody(current.body ?? "");
    }else{
      setTitle("");
      setbody("");
    }
  },[current]);

  if (!current) {
    return <div className="editor empty">Select or add a note</div>;
  }

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setTitle(newTitle);

    if(current) updateNote(current.id, "title", newTitle);
  }

  const handleBodyChange = (e) => {
    const newBody = e.target.value;
    setbody(newBody);

    if(current) updateNote(current.id, "body", newBody);
  }

  return (
    <div className="editor">
      <input
        className="title-input"
        placeholder="Title..."
        value={title}
        onChange={handleTitleChange}
      />

      <textarea
        className="body-input"
        placeholder="Write your note..."
        value={body}
        onChange={handleBodyChange}
      />

      <button
        className="delete-btn"
        onClick={() => deleteNote(current.id)}>
        Delete Note
      </button>
    </div>
  );
}
export default Editor;