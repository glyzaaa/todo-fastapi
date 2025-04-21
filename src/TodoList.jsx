import { useState } from "react";
import "./App.css";

export default function TodoList({ tasks, onAdd }) {
  const [task, setTask] = useState("");

  const handleAdd = () => {
    if (!task.trim()) return;
    onAdd({ title: task });
    setTask("");
  };

  return (
    <div>
      <h1>To-Do List</h1>
      <input
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="New task"
      />
      <button onClick={handleAdd}>Add Task</button>
      <ul>
        {tasks.map((t) => (
          <li key={t.id}>{t.title}</li>
        ))}
      </ul>
    </div>
  );
}
