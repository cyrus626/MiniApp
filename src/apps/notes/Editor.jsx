import { useEffect, useState } from "react";
import "../../index.css";

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
    <div className="flex flex-col px-4 mb-2 flex-1 overflow-y-auto">
      <input
        className="font-semibold text-2xl my-3 pb-3 border-b-2
          border-gray-300"
        placeholder="Title..."
        value={title}
        onChange={handleTitleChange}
      />

      <textarea
        className="flex-1 resize-none p-5 border 
          border-gray-300 rounded-lg focus:outline-none text-lg"
        placeholder="Write your note..."
        value={body}
        onChange={handleBodyChange}
      />

      <button
        className="cursor-pointer mt-3 bg-red-600 p-3 rounded-lg
          font-bold text-lg"
        onClick={() => deleteNote(current.id)}>
        Delete Note
      </button>
    </div>
  );
}
export default Editor;