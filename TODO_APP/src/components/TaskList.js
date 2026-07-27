import React from 'react';
import TaskItem from './TaskItem';
import './TaskList.css';

const TaskList = ({ tasks, onToggleTask, onDeleteTask, onUpdateTask }) => {
  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={() => onToggleTask(task.id)}
          onDelete={() => onDeleteTask(task.id)}
          onUpdate={(updates) => onUpdateTask(task.id, updates)}
        />
      ))}
    </div>
  );
};

export default TaskList;
