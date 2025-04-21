5

import React, { useEffect, useState } from "react";
import {
  getTodos,
  createTodo,
  deleteTodo,
  updateTodo,
} from "./api";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");

  const fetchTodos = async () => {
    const data = await getTodos();
    setTodos(data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (task.trim()) {
      const newTodo = await createTodo(task);
      setTodos([...todos, newTodo]);
      setTask("");
    }
  };

  const handleDelete = async (id) => {
    await deleteTodo(id);
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleToggle = async (id) => {
    const todo = todos.find((todo) => todo.id === id);
    const updatedTodo = await updateTodo(id, {
      task: todo.task,
      completed: !todo.completed,
    });
    setTodos(todos.map((t) => (t.id === id ? updatedTodo : t)));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Add a new task"
          className="p-2 border rounded mr-2"
        />
        <button type="submit" className="p-2 bg-blue-500 text-white rounded">
          Add
        </button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className="mb-2">
            <span
              onClick={() => handleToggle(todo.id)}
              className={`cursor-pointer ${
                todo.completed ? "line-through text-gray-500" : ""
              }`}
            >
              {todo.task}
            </span>
            <button
              onClick={() => handleDelete(todo.id)}
              className="ml-4 text-red-500"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
