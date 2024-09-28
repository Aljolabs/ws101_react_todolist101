import React, { useState, useEffect } from 'react';
import './TodoList.css';  

const TodoList = () => {
  const getInitialTasks = () => {
    const storedTasks = localStorage.getItem('tasks');
    return storedTasks ? JSON.parse(storedTasks) : [];
  };

  const [tasks, setTasks] = useState(getInitialTasks);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [newTaskDueDate, setNewTaskDueDate] = useState('');
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTaskTitle, setEditTaskTitle] = useState('');
  const [editTaskDescription, setEditTaskDescription] = useState('');
  const [editTaskDueDate, setEditTaskDueDate] = useState('');
  const [showInput, setShowInput] = useState(false);

  // Get the current date in YYYY-MM-DD format
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTaskTitle.trim() && newTaskDescription.trim() && newTaskDueDate) {
      const newTaskObj = { 
        id: tasks.length + 1, 
        title: newTaskTitle, 
        description: newTaskDescription, 
        dueDate: newTaskDueDate,
        completed: false 
      };
      setTasks([...tasks, newTaskObj]);
      setNewTaskTitle('');
      setNewTaskDescription('');
      setNewTaskDueDate('');
      setShowInput(false);
    }
  };

  const cancelAddTask = () => {
    setNewTaskTitle('');
    setNewTaskDescription('');
    setNewTaskDueDate('');
    setShowInput(false);
  };

  const deleteTask = (id) => {
    const taskToDelete = tasks.find(task => task.id === id);
    const confirmDelete = window.confirm(`Are you sure you want to delete this task: "${taskToDelete.title}"?`);
    if (confirmDelete) {
      setTasks(tasks.filter((task) => task.id !== id));
    }
  };

  const toggleCompletion = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const startEditing = (task) => {
    setEditTaskId(task.id);
    setEditTaskTitle(task.title);
    setEditTaskDescription(task.description);
    setEditTaskDueDate(task.dueDate);
  };

  const saveTask = () => {
    setTasks(
      tasks.map((task) =>
        task.id === editTaskId ? { 
          ...task, 
          title: editTaskTitle, 
          description: editTaskDescription, 
          dueDate: editTaskDueDate 
        } : task
      )
    );
    setEditTaskId(null);
    setEditTaskTitle('');
    setEditTaskDescription('');
    setEditTaskDueDate('');
  };

  const cancelEdit = () => {
    setEditTaskId(null);
    setEditTaskTitle('');
    setEditTaskDescription('');
    setEditTaskDueDate('');
  };

  const completedTasksCount = tasks.filter((task) => task.completed).length;

  return (
    <div className="todo-container">
      <h2 className="title">TO DO's</h2>
      <div className="task-progress">
        <div className="speedometer-container">
          <svg className="speedometer" viewBox="0 0 36 36">
            <path className="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
            <path className="circle" strokeDasharray={`${(completedTasksCount / tasks.length) * 100}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
            <text x="18" y="20.35" className="percentage">{completedTasksCount}/{tasks.length}</text>
          </svg>
          <p className="completed-tasks-text">Completed Tasks</p> {/* New Text */}
        </div>
      </div>
      
     

      
      {showInput && (
        <div className="input-section">
          <input
            type="text"
            value={newTaskTitle}
            placeholder="Task Title"
            onChange={(e) => setNewTaskTitle(e.target.value)}
            className="input-task-title"
          />
          <textarea
            value={newTaskDescription}
            placeholder="Task Description"
            onChange={(e) => setNewTaskDescription(e.target.value)}
            className="input-task-description"
          />
          <input
            type="date"
            value={newTaskDueDate}
            min={getCurrentDate()} // Set minimum date to today
            onChange={(e) => setNewTaskDueDate(e.target.value)}
            className="input-task-due-date"
/>
          <button className="add-button" onClick={addTask}>
            Add Task
          </button>
          
          <button className="cancel-button" onClick={cancelAddTask}>
            Cancel
          </button>
        </div>
      )}

      
      {!showInput && (
      <div className="add-task-wrapper"> {/* Wrapper to hold button and text */}
        <button className="show-input-button" onClick={() => setShowInput(true)}>
          +
        </button>
        <span className="add-task-text">Add New Task</span> {/* New Text */}
      </div>
    )}

      <ul className="task-list">
        {tasks.length === 0 ? (
          <p className="no-tasks-text">No tasks yet. Add a new task!</p>
        ) : (
          tasks.map((task) => (
            <li key={task.id} className="task-item">
              <div className="task-info">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleCompletion(task.id)}
                  className="task-checkbox"
                />
                <div>
                  <span className={task.completed ? 'task-completed task-title' : 'task-title'}>
                    {task.title}
                  </span>
                  <p className="task-description">{task.description}</p>
                  {task.dueDate && <p className="task-due-date">Due: {new Date(task.dueDate).toLocaleDateString()}</p>}
                </div>
              </div>
              <div className="task-actions">
                {editTaskId === task.id ? (
                  <div className="input-section">
                    <input
                      type="text"
                      value={editTaskTitle}
                      placeholder="Edit Task Title"
                      onChange={(e) => setEditTaskTitle(e.target.value)}
                      className="input-task-title"
                    />
                    <textarea
                      value={editTaskDescription}
                      placeholder="Edit Task Description"
                      onChange={(e) => setEditTaskDescription(e.target.value)}
                      className="input-task-description"
                    />
                    <input
                      type="date"
                      value={editTaskDueDate}
                      min={getCurrentDate()} // Set minimum date to today
                      onChange={(e) => setEditTaskDueDate(e.target.value)}
                      className="input-task-due-date"
                    />
                    <button className="save-button" onClick={saveTask}>
                      💾
                    </button>
                    <button className="cancel-button" onClick={cancelEdit}>
                      Cancel
                    </button>
                  </div>
                ) : (
                  <>
                    <button className="edit-button" onClick={() => startEditing(task)}>
                      ✏️
                    </button>
                    <button className="delete-button" onClick={() => deleteTask(task.id)}>  
                      🗑️
                    </button>
                  </>
                )}
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default TodoList;
