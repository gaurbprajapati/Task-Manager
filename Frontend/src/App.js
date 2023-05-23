import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editTask_id, setEditTask_id] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchTasks();
  }, [tasks]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('api/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleAddTask = async () => {
    try {
      const response = await axios.post('api/addtasks', { title, description });
      const newTask = response.data;
      setTasks([...tasks, newTask]);
      setTitle('');
      setDescription('');
      setMessage('Task created successfully');
    } catch (error) {
      console.error('Error creating task:', error);
      setMessage('Error creating task' + error);
      console.log(error);
    }
  };


  const handleDeleteTask = async (task_id) => {
    try {
      await axios.delete(`api/deltasks/${task_id}`);
      setTasks(tasks.filter((task) => task._id !== task_id));
      setMessage('Task deleted successfully');
    } catch (error) {
      console.error('Error deleting task:', error);
      setMessage('Error deleting task');
    }
  };

  const handleEditTask = (task) => {
    setEditTask_id(task._id);
    setEditTitle(task.title);
    setEditDescription(task.description);
  };

  const handleUpdateTask = async () => {
    try {
      await axios.put(`api/updatetasks/${editTask_id}`, {
        title: editTitle,
        description: editDescription,
      });
      const updatedTasks = tasks.map((task) => {
        if (task._id === editTask_id) {
          return {
            ...task,
            title: editTitle,
            description: editDescription,
          };
        }
        return task;
      });
      setTasks(updatedTasks);
      setEditTask_id('');
      setEditTitle('');
      setEditDescription('');
      setMessage('Task updated successfully');
    } catch (error) {
      console.error('Error updating task:', error);
      setMessage('Error updating task');
    }
  };

  return (
    <div className="container">
      <h1 className="main-heading">Task Manager</h1>
      <div className="add-task">
        <h2 className='add-task-css' >Add Task</h2>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button onClick={handleAddTask}>Add Task</button>

      </div>
      <h2 className="heading">All Tasks</h2>
      {message && <p className={`alert ${message.includes('successfully') ? 'success' : 'error'}`}>{message}</p>}
      <div className="task-list">
        {tasks.map((task) => (
          <div key={task._id} className="task-item">
            <div className="task-details">
              {editTask_id === task._id ? (
                <div>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                  />
                  <input
                    type="text"
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                  />
                  <button onClick={handleUpdateTask}>Update</button>
                </div>
              ) : (
                <div>
                  <h3>{task.title}</h3>
                  <p>{task.description}</p>
                </div>
              )}
            </div>
            <div className="task-actions">
              <button className="delete-button" onClick={() => handleDeleteTask(task._id)}>
                Delete
              </button>
              <button className="update-button" onClick={() => handleEditTask(task)}>
                Update
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
