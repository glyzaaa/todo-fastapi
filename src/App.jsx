import { useState, useEffect } from "react";
import axios from "axios";
import TodoList from "./TodoList";

function App() {
  const [tasks, setTasks] = useState([]);
  const API_URL = "https://todo-fastapi-sjxd.onrender.com/todos/";

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(API_URL);
        if (Array.isArray(response.data)) {
          setTasks(response.data);
        } else {
          console.error("Expected array but got:", response.data);
        }
      } catch (error) {
        console.error("Error fetching tasks:", error.message);
      }
    };
    fetchTasks();
  }, []);

  const addTask = async (newTask) => {
    try {
      const response = await axios.post(API_URL, newTask);
      setTasks((prevTasks) => [...prevTasks, response.data]);
    } catch (error) {
      console.error("Error adding task:", error.message);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}${id}/`);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error.message);
    }
  };

  return (
    <div className="app-container">
      <TodoList tasks={tasks} onAdd={addTask} onDelete={deleteTask} />
    </div>
  );
}

export default App;
