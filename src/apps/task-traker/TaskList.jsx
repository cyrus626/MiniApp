export default function TaskList({ tasks, onToggle, onDelete }) {
  return (
    <ul className="space-y-3">
      {tasks.map((task) => (
        <li className=" flex items-center justify-between
          bg-white border border-gray-200
          rounded-lg px-4 py-3 shadow-md" key={task.id}>
          <span className={`cursor-pointer 
           flex-1
           ${task.completed ? "line-through text-gray-400" : "text-gray-800"}`}
            onClick={() => onToggle(task.id)}>{task.text}</span>
          <button onClick={() => onDelete(task.id)}
            className="ml-4 text-red-500 hover:text-red-700 font-semibold">X</button>
        </li>
      ))}
    </ul>
  );
}
