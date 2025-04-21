import React, { useState } from "react";
import { createTodo } from "../api";

function AddTodo({ onAdd }) {
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title.trim()) {
      try {
        const newTodo = await createTodo(title);
        onAdd(newTodo);
        setTitle("");
      } catch (error) {
        console.error("Failed to add todo:", error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="todo-title">New Task</label>
      <input
        type="text"
        id="todo-title"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new todo"
        required
      />
      <button type="submit">Add</button>
    </form>
  );
}

export default AddTodo;
