import { useState } from "react";

export default function TaskInput({ onAdd }) {
  const [text, setText] = useState("");

  const handleAdd = () => {
    if (!text.trim()) return;
    onAdd(text);
    setText("");
  };

  return (
    <div className="flex gap-3 mb-6">
      <input
        className="flex-1 px-4 py-2 
      border border-gray-400
      rounded-lg focus:outine-none
      focus:ring-2 focus:ring-blue-400"
        type="text"
        placeholder="Enter task..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button className="px-5 py-2
      bg-blue-600 text-white rounded-lg
      hover:bg-blue-700 transition"
        onClick={handleAdd}>Add</button>
    </div>
  );
}
