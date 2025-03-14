import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editingTodo, setEditingTodo] = useState(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('http://localhost:5000/todos');
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) {
      alert('Title is required');
      return;
    }

    const todoData = { title, description, completed: false };

    if (editingTodo) {
      try {
        const response = await axios.put(`http://localhost:5000/todos/${editingTodo._id}`, todoData);
        const updatedTodos = todos.map(todo => (todo._id === editingTodo._id ? response.data : todo));
        setTodos(updatedTodos);
        resetForm();
      } catch (error) {
        console.error('Error updating todo:', error);
      }
    } else {
      try {
        const response = await axios.post('http://localhost:5000/todos', todoData);
        setTodos([...todos, response.data]);
        resetForm();
      } catch (error) {
        console.error('Error adding todo:', error);
      }
    }
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setEditingTodo(null);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/todos/${id}`);
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handleEdit = (todo) => {
    setTitle(todo.title);
    setDescription(todo.description);
    setEditingTodo(todo);
  };

  const toggleComplete = async (id) => {
    try {
      const todo = todos.find(todo => todo._id === id);
      const updatedTodo = { ...todo, completed: !todo.completed };
      const response = await axios.put(`http://localhost:5000/todos/${id}`, updatedTodo);
      const updatedTodos = todos.map(todo => (todo._id === id ? response.data : todo));
      setTodos(updatedTodos);
    } catch (error) {
      console.error('Error toggling todo completion:', error);
    }
  };

  return (
    <div className="container">
      <h1>{editingTodo ? 'Edit Todo' : 'Add Todo'}</h1>

      {/* Add/Edit Todo Form */}
      <form onSubmit={handleSubmit} className="todo-form">
        <input
          type="text"
          placeholder="Enter todo title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Enter description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">{editingTodo ? 'Update Todo' : 'Add Todo'}</button>
      </form>

      {/* Todo List */}
      <div className="todo-list">
        {todos.length === 0 ? (
          <p>No todos available</p>
        ) : (
          todos.map(todo => (
            <div
              key={todo._id}
              className={`todo-item ${todo.completed ? 'completed' : ''}`}
            >
              <div className="todo-title">{todo.title}</div>
              {todo.description && <div className="todo-description">{todo.description}</div>}
              <div className="todo-actions">
                <button className="edit" onClick={() => handleEdit(todo)}>Edit</button>
                <button className="delete" onClick={() => handleDelete(todo._id)}>Delete</button>
                <button
                  className={`toggle ${todo.completed ? 'completed' : ''}`}
                  onClick={() => toggleComplete(todo._id)}
                >
                  {todo.completed ? 'Undo' : 'Complete'}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
