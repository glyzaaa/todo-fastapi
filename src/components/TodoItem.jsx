import React, { useState } from "react";
import { updateTodo, deleteTodo } from "../api";

function TodoItem({ todo, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggleComplete = async () => {
    setIsLoading(true);
    try {
      const data = await updateTodo(todo.id, { completed: !todo.completed });
      onUpdate(data);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (title.trim()) {
      setIsLoading(true);
      try {
        const data = await updateTodo(todo.id, { title });
        onUpdate(data);
        setIsEditing(false);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await deleteTodo(todo.id);
      onDelete(todo.id);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`todo-item ${isLoading ? "loading" : ""}`}>
      {/* Checkbox for completion with unique id and name */}
      <label htmlFor={`todo-check-${todo.id}`} className="sr-only">
        Mark as {todo.completed ? "incomplete" : "completed"}
      </label>
      <input
        id={`todo-check-${todo.id}`}  // Unique id
        name={`todo-check-${todo.id}`} // Unique name
        type="checkbox"
        checked={todo.completed}
        onChange={handleToggleComplete}
        disabled={isLoading}
      />

      {/* Input field for editing the title with unique id and name */}
      {isEditing ? (
        <>
          <label htmlFor={`edit-title-${todo.id}`} className="sr-only">
            Edit title
          </label>
          <input
            id={`edit-title-${todo.id}`}  // Unique id
            name={`edit-title-${todo.id}`} // Unique name
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={handleSave}
            autoFocus
            disabled={isLoading}
          />
        </>
      ) : (
        <span onClick={() => setIsEditing(true)}>{todo.title}</span>
      )}

      {/* Delete button with loading state */}
      <button onClick={handleDelete} disabled={isLoading}>
        {isLoading ? "Deleting..." : "Delete"}
      </button>
    </div>
  );
}

export default TodoItem;
