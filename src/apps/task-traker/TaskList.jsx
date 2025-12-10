export default function TaskList({ tasks, onToggle, onDelete }) {
  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <li key={task.id} className={task.completed ? "completed" : ""}>
          <span onClick={() => onToggle(task.id)}>{task.text}</span>
          <button onClick={() => onDelete(task.id)}>X</button>
        </li>
      ))}
    </ul>
  );
}
