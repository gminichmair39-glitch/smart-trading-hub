import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import TaskFilters from './components/TaskFilters';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  // Load tasks from localStorage on mount
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      try {
        setTasks(JSON.parse(savedTasks));
      } catch (error) {
        console.error('Error loading tasks:', error);
      }
    }
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (taskData) => {
    const newTask = {
      id: uuidv4(),
      title: taskData.title,
      description: taskData.description,
      dueDate: taskData.dueDate,
      priority: taskData.priority,
      category: taskData.category,
      completed: false,
      createdAt: new Date().toISOString(),
      completedAt: null,
    };
    setTasks([newTask, ...tasks]);
  };

  const updateTask = (id, updates) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, ...updates } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
              completedAt: !task.completed ? new Date().toISOString() : null,
            }
          : task
      )
    );
  };

  // Filter tasks
  let filteredTasks = tasks;
  if (filter === 'active') {
    filteredTasks = tasks.filter((task) => !task.completed);
  } else if (filter === 'completed') {
    filteredTasks = tasks.filter((task) => task.completed);
  }

  // Sort tasks
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    switch (sortBy) {
      case 'priority':
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      case 'dueDate':
        return new Date(a.dueDate || '9999-12-31') - new Date(b.dueDate || '9999-12-31');
      case 'date':
      default:
        return new Date(b.createdAt) - new Date(a.createdAt);
    }
  });

  const stats = {
    total: tasks.length,
    completed: tasks.filter((t) => t.completed).length,
    active: tasks.filter((t) => !t.completed).length,
  };

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <h1>📝 My Tasks</h1>
          <p className="subtitle">Stay organized and productive</p>
        </header>

        <div className="stats">
          <div className="stat-item">
            <span className="stat-label">Total:</span>
            <span className="stat-value">{stats.total}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Active:</span>
            <span className="stat-value active">{stats.active}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Completed:</span>
            <span className="stat-value completed">{stats.completed}</span>
          </div>
        </div>

        <TaskForm onAddTask={addTask} />

        <TaskFilters
          currentFilter={filter}
          currentSort={sortBy}
          onFilterChange={setFilter}
          onSortChange={setSortBy}
        />

        <TaskList
          tasks={sortedTasks}
          onToggleTask={toggleTask}
          onDeleteTask={deleteTask}
          onUpdateTask={updateTask}
        />

        {sortedTasks.length === 0 && (
          <div className="empty-state">
            <p>✨ No tasks here! Create one to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
