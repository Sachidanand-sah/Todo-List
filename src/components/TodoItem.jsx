import React from 'react';

const TodoItem = ({ task, toggleTask, deleteTask }) => {
  return (
    <li className={`todo-item ${task.completed ? 'completed' : ''}`}>
      <span>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleTask(task.id)}
        />
        {task.text}
      </span>
      <button onClick={() => deleteTask(task.id)}>Delete</button>
    </li>
  );
};

export default TodoItem;
