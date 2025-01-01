import PropTypes from 'prop-types';

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

TodoItem.propTypes = {
    task: PropTypes.shape({
        id: PropTypes.number.isRequired,
        text: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired,
    }).isRequired,
    toggleTask: PropTypes.func.isRequired,
    deleteTask: PropTypes.func.isRequired,
};

export default TodoItem;
