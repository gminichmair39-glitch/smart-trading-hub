import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Trash2, Plus } from 'lucide-react';
import './TradingJournal.css';

const TradingJournal = () => {
  const [entries, setEntries] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    tags: '',
  });

  useEffect(() => {
    loadEntries();
  }, []);

  const loadEntries = async () => {
    try {
      const data = await window.electron.db.query('SELECT * FROM journal_entries ORDER BY date DESC');
      setEntries(data);
    } catch (error) {
      console.error('Error loading journal entries:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const id = uuidv4();
      const now = new Date().toISOString();
      const date = new Date().toLocaleDateString();

      await window.electron.db.run(
        `INSERT INTO journal_entries (id, date, title, content, tags, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [id, date, formData.title, formData.content, formData.tags, now, now]
      );

      setFormData({ title: '', content: '', tags: '' });
      setShowForm(false);
      loadEntries();
    } catch (error) {
      console.error('Error saving journal entry:', error);
    }
  };

  const deleteEntry = async (id) => {
    try {
      await window.electron.db.run('DELETE FROM journal_entries WHERE id = ?', [id]);
      loadEntries();
    } catch (error) {
      console.error('Error deleting entry:', error);
    }
  };

  return (
    <div className="journal">
      <div className="journal-header">
        <h1>Trading Journal</h1>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          <Plus size={20} /> New Entry
        </button>
      </div>

      {showForm && (
        <div className="journal-form">
          <h2>Create New Entry</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Content</label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                rows="6"
                required
              />
            </div>
            <div className="form-group">
              <label>Tags (comma separated)</label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              />
            </div>
            <div className="form-actions">
              <button type="submit" className="btn btn-success">Save Entry</button>
              <button type="button" className="btn btn-secondary" onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div className="entries-list">
        {entries.length === 0 ? (
          <p className="no-data">No journal entries yet. Create one to get started!</p>
        ) : (
          entries.map((entry) => (
            <div key={entry.id} className="entry-card">
              <div className="entry-header">
                <div>
                  <h3>{entry.title}</h3>
                  <p className="entry-date">{entry.date}</p>
                </div>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteEntry(entry.id)}
                >
                  <Trash2 size={18} />
                </button>
              </div>
              <p className="entry-content">{entry.content}</p>
              {entry.tags && <p className="entry-tags">Tags: {entry.tags}</p>}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TradingJournal;
