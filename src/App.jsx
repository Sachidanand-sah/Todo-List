import  { useState, useEffect } from 'react';
import './App.css';
import { Container, Button } from 'reactstrap';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import db from './firebase';
import { collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'tasks'), (snapshot) => {
      const tasksData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setTasks(tasksData);
    });
    return () => unsubscribe();
  }, []);

  const addTask = async (task) => {
    await addDoc(collection(db, 'tasks'), task);
  };

  const toggleTask = async (id, completed) => {
    await updateDoc(doc(db, 'tasks', id), { completed: !completed });
  };

  const deleteTask = async (id) => {
    await deleteDoc(doc(db, 'tasks', id));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  return (
    <Container>
      <div id="todo-container">
        <h1>Todo List</h1>
        <TodoForm addTask={addTask} />
        <div className="filter-buttons">
          <Button color="secondary" onClick={() => setFilter('all')}>All</Button>
          <Button color="info" onClick={() => setFilter('active')}>Active</Button>
          <Button color="success" onClick={() => setFilter('completed')}>Completed</Button>
        </div>
        <TodoList tasks={filteredTasks} toggleTask={toggleTask} deleteTask={deleteTask} />
      </div>
    </Container>
  );
};

export default App;
