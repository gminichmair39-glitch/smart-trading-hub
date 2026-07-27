import React, { useState } from 'react';
import { Trash2, Edit2, Check } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import './TaskItem.css';

const TaskItem = ({ task, onToggle, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: task.title,
    description: task.description,
  });

  const handleSaveEdit = () => {
    onUpdate(editData);
    setIsEditing(false);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return '#e74c3c';
      case 'medium':
        return '#f39c12';
      case 'low':
        return '#3498db';
      default:
        return '#95a5a6';
    }
  };

  const getCategoryEmoji = (category) => {
    const emojis = {
      general: '📌',
      work: '💼',
      personal: '👤',
      shopping: '🛒',
      health: '🏥',
    };
    return emojis[category] || '📌';
  };

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && !task.completed;

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''} ${isOverdue ? 'overdue' : ''}`}>
      <div className="task-checkbox">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={onToggle}
          id={`task-${task.id}`}
        />
        <label htmlFor={`task-${task.id}`}></label>
      </div>

      <div className="task-content">
        {isEditing ? (
          <div className="edit-form">
            <input
              type="text"
              value={editData.title}
              onChange={(e) => setEditData({ ...editData, title: e.target.value })}
              autoFocus
            />
            <textarea
              value={editData.description}
              onChange={(e) => setEditData({ ...editData, description: e.target.value })}
            />
            <div className="edit-actions">
              <button className="btn-save" onClick={handleSaveEdit}>
                Save
              </button>
              <button className="btn-cancel" onClick={() => setIsEditing(false)}>
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="task-header">
              <h3 className="task-title">{task.title}</h3>
              <span className="priority-badge" style={{ backgroundColor: getPriorityColor(task.priority) }}>
                {task.priority}
              </span>
            </div>
            {task.description && <p className="task-description">{task.description}</p>}
            <div className="task-meta">
              <span className="category-badge">{getCategoryEmoji(task.category)} {task.category}</span>
              {task.dueDate && (
                <span className="due-date">
                  📅 {new Date(task.dueDate).toLocaleDateString()}
                </span>
              )}
              <span className="created-time">
                {formatDistanceToNow(new Date(task.createdAt), { addSuffix: true })}
              </span>
            </div>
          </>
        )}
      </div>

      <div className="task-actions">
        {!isEditing && (
          <>
            <button
              className="btn-icon btn-edit"
              onClick={() => setIsEditing(true)}
              title="Edit task"
            >
              <Edit2 size={18} />
            </button>
            <button
              className="btn-icon btn-delete"
              onClick={onDelete}
              title="Delete task"
            >
              <Trash2 size={18} />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TaskItem;
