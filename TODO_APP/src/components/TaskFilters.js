import React from 'react';
import './TaskFilters.css';

const TaskFilters = ({ currentFilter, currentSort, onFilterChange, onSortChange }) => {
  return (
    <div className="filters-container">
      <div className="filter-group">
        <label>Filter:</label>
        <div className="filter-buttons">
          <button
            className={`filter-btn ${currentFilter === 'all' ? 'active' : ''}`}
            onClick={() => onFilterChange('all')}
          >
            All
          </button>
          <button
            className={`filter-btn ${currentFilter === 'active' ? 'active' : ''}`}
            onClick={() => onFilterChange('active')}
          >
            Active
          </button>
          <button
            className={`filter-btn ${currentFilter === 'completed' ? 'active' : ''}`}
            onClick={() => onFilterChange('completed')}
          >
            Completed
          </button>
        </div>
      </div>

      <div className="filter-group">
        <label>Sort by:</label>
        <select value={currentSort} onChange={(e) => onSortChange(e.target.value)}>
          <option value="date">Most Recent</option>
          <option value="priority">Priority</option>
          <option value="dueDate">Due Date</option>
        </select>
      </div>
    </div>
  );
};

export default TaskFilters;
