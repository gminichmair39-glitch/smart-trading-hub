import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './Academy.css';

const Academy = () => {
  const [materials, setMaterials] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [formData, setFormData] = useState({
    title: '',
    category: 'beginner',
    content: '',
    difficulty_level: 'beginner',
  });

  const categories = ['beginner', 'intermediate', 'advanced'];

  useEffect(() => {
    loadMaterials();
  }, []);

  const loadMaterials = async () => {
    try {
      const data = await window.electron.db.query('SELECT * FROM learning_materials ORDER BY created_at DESC');
      setMaterials(data);
    } catch (error) {
      console.error('Error loading materials:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const id = uuidv4();
      const now = new Date().toISOString();

      await window.electron.db.run(
        `INSERT INTO learning_materials (id, title, category, content, difficulty_level, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [id, formData.title, formData.category, formData.content, formData.difficulty_level, now, now]
      );

      setFormData({
        title: '',
        category: 'beginner',
        content: '',
        difficulty_level: 'beginner',
      });
      setShowForm(false);
      loadMaterials();
    } catch (error) {
      console.error('Error saving material:', error);
    }
  };

  const filteredMaterials = selectedCategory === 'all'
    ? materials
    : materials.filter((m) => m.category === selectedCategory);

  return (
    <div className="academy">
      <div className="academy-header">
        <h1>Trading Academy</h1>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          + Add Learning Material
        </button>
      </div>

      {showForm && (
        <div className="material-form">
          <h2>Create New Learning Material</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Category</label>
                <select name="category" value={formData.category} onChange={handleChange}>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Difficulty Level</label>
                <select name="difficulty_level" value={formData.difficulty_level} onChange={handleChange}>
                  {categories.map((level) => (
                    <option key={level} value={level}>
                      {level.charAt(0).toUpperCase() + level.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>Content</label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                rows="6"
                required
              />
            </div>
            <div className="form-actions">
              <button type="submit" className="btn btn-success">Save Material</button>
              <button type="button" className="btn btn-secondary" onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div className="category-filter">
        <button
          className={`filter-btn ${selectedCategory === 'all' ? 'active' : ''}`}
          onClick={() => setSelectedCategory('all')}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      <div className="materials-grid">
        {filteredMaterials.length === 0 ? (
          <p className="no-data">No learning materials available yet.</p>
        ) : (
          filteredMaterials.map((material) => (
            <div key={material.id} className="material-card">
              <div className="material-header">
                <h3>{material.title}</h3>
                <span className={`badge badge-${material.difficulty_level}`}>
                  {material.difficulty_level}
                </span>
              </div>
              <p className="material-content">{material.content}</p>
              <p className="material-category">Category: {material.category}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Academy;
