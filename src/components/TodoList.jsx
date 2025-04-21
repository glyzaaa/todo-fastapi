import React from "react";
import TodoItem from "./TodoItem";

function TodoList({ todos, onUpdate, onDelete }) {
  return (
    <ul>
      {Array.isArray(todos) ? (
        todos.map((todo) => (
          <li key={todo.id}>
            <TodoItem todo={todo} onUpdate={onUpdate} onDelete={onDelete} />
          </li>
        ))
      ) : (
        <li>No todos to show</li>
      )}
    </ul>
  );
}

export default TodoList;
