import  { useState } from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ tasks, addTask, toggleTask, deleteTask, setFilter }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      addTask(input);
      setInput('');
    }
  };

  return (
    <div className="todo-list">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Add a new task"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
      <div className="filters">
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('active')}>Active</button>
        <button onClick={() => setFilter('completed')}>Completed</button>
      </div>
      <ul>
        {tasks.map((task) => (
          <TodoItem
            key={task.id}
            task={task}
            toggleTask={toggleTask}
            deleteTask={deleteTask}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
