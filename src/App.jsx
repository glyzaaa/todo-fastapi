import React, { useState, useEffect } from "react";
import axios from "axios";
import FilterButtons from "./FilterButtons";
import ThemeToggle from "./ThemeToggle";

const BASE_URL = "https://todo-fastapi-sjxd.onrender.com/todos";

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [theme, setTheme] = useState("light");
  const [newTask, setNewTask] = useState({ title: "", description: "" });

axios.get("https://todo-fastapi-sjxd.onrender.com/todos")

  useEffect(() => {
    axios
      .get(BASE_URL)
      .then((res) => setTasks(res.data))
      .catch((err) => console.error("Error fetching tasks:", err));
  }, []);

  const handleAddTask = () => {
    if (!newTask.title.trim()) return;

    axios
      .post(BASE_URL, { ...newTask, completed: false })
      .then((res) => setTasks([...tasks, res.data]))
      .catch((err) => console.error("Error creating task:", err));

    setNewTask({ title: "", description: "" });
  };

  const handleToggleComplete = (id, completed) => {
    axios
      .put(`${BASE_URL}/${id}`, { completed })
      .then((res) =>
        setTasks(tasks.map((task) => (task.id === id ? res.data : task)))
      )
      .catch((err) => console.error("Error updating task:", err));
  };

  const handleDelete = (id) => {
    axios
      .delete(`${BASE_URL}/${id}`)
      .then(() => setTasks(tasks.filter((task) => task.id !== id)))
      .catch((err) => console.error("Error deleting task:", err));
  };

  const filteredTasks =
    Array.isArray(tasks) && tasks.length > 0
      ? tasks.filter((t) => {
          if (filter === "completed") return t.completed;
          if (filter === "pending") return !t.completed;
          return true;
        })
      : [];

  return (
    <div className={`app ${theme}`}>
      <h1>To-Do List</h1>
      <ThemeToggle theme={theme} setTheme={setTheme} />
      <FilterButtons setFilter={setFilter} />
      <input
        type="text"
        placeholder="Task Title"
        value={newTask.title}
        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
      />
      <input
        type="text"
        placeholder="Description"
        value={newTask.description}
        onChange={(e) =>
          setNewTask({ ...newTask, description: e.target.value })
        }
      />
      <button onClick={handleAddTask}>Add</button>

      <ul>
        {filteredTasks.map((task) => (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={(e) =>
                handleToggleComplete(task.id, e.target.checked)
              }
            />
            <strong>{task.title}</strong>: {task.description}
            <button onClick={() => handleDelete(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
