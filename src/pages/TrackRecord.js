import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Plus, Trash2 } from 'lucide-react';
import './TrackRecord.css';

const TrackRecord = () => {
  const [trades, setTrades] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    symbol: '',
    entryPrice: '',
    exitPrice: '',
    lotSize: '',
    entryDate: new Date().toISOString().split('T')[0],
    exitDate: '',
    notes: '',
  });
  const [stats, setStats] = useState({
    totalTrades: 0,
    winTrades: 0,
    lossTrades: 0,
    winRate: 0,
    totalProfit: 0,
  });

  useEffect(() => {
    loadTrades();
  }, []);

  const loadTrades = async () => {
    try {
      const data = await window.electron.db.query('SELECT * FROM trades ORDER BY entry_date DESC');
      setTrades(data);
      calculateStats(data);
    } catch (error) {
      console.error('Error loading trades:', error);
    }
  };

  const calculateStats = (tradesData) => {
    const total = tradesData.length;
    const wins = tradesData.filter((t) => t.profit_loss > 0).length;
    const losses = tradesData.filter((t) => t.profit_loss < 0).length;
    const totalProfit = tradesData.reduce((sum, t) => sum + (t.profit_loss || 0), 0);

    setStats({
      totalTrades: total,
      winTrades: wins,
      lossTrades: losses,
      winRate: total > 0 ? ((wins / total) * 100).toFixed(2) : 0,
      totalProfit: totalProfit.toFixed(2),
    });
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
      const exitPrice = formData.exitPrice ? parseFloat(formData.exitPrice) : null;
      const entryPrice = parseFloat(formData.entryPrice);
      const lotSize = parseFloat(formData.lotSize);

      let profitLoss = null;
      let winLoss = null;

      if (exitPrice) {
        profitLoss = (exitPrice - entryPrice) * lotSize;
        winLoss = profitLoss > 0 ? 'win' : 'loss';
      }

      await window.electron.db.run(
        `INSERT INTO trades (id, symbol, entry_price, exit_price, lot_size, entry_date, exit_date, profit_loss, win_loss, notes, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          id,
          formData.symbol,
          entryPrice,
          exitPrice,
          lotSize,
          formData.entryDate,
          formData.exitDate || null,
          profitLoss,
          winLoss,
          formData.notes,
          now,
          now,
        ]
      );

      setFormData({
        symbol: '',
        entryPrice: '',
        exitPrice: '',
        lotSize: '',
        entryDate: new Date().toISOString().split('T')[0],
        exitDate: '',
        notes: '',
      });
      setShowForm(false);
      loadTrades();
    } catch (error) {
      console.error('Error saving trade:', error);
    }
  };

  const deleteTrade = async (id) => {
    try {
      await window.electron.db.run('DELETE FROM trades WHERE id = ?', [id]);
      loadTrades();
    } catch (error) {
      console.error('Error deleting trade:', error);
    }
  };

  return (
    <div className="track-record">
      <div className="record-header">
        <h1>My Track Record</h1>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          <Plus size={20} /> New Trade
        </button>
      </div>

      <div className="stats-grid">
        <div className="stat-card-small">
          <p>Total Trades</p>
          <h3>{stats.totalTrades}</h3>
        </div>
        <div className="stat-card-small">
          <p>Win Trades</p>
          <h3 style={{ color: '#16a34a' }}>{stats.winTrades}</h3>
        </div>
        <div className="stat-card-small">
          <p>Loss Trades</p>
          <h3 style={{ color: '#ef4444' }}>{stats.lossTrades}</h3>
        </div>
        <div className="stat-card-small">
          <p>Win Rate</p>
          <h3>{stats.winRate}%</h3>
        </div>
        <div className="stat-card-small">
          <p>Total Profit/Loss</p>
          <h3 style={{ color: stats.totalProfit >= 0 ? '#16a34a' : '#ef4444' }}>
            ${stats.totalProfit}
          </h3>
        </div>
      </div>

      {showForm && (
        <div className="trade-form">
          <h2>Record New Trade</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Symbol</label>
                <input
                  type="text"
                  name="symbol"
                  value={formData.symbol}
                  onChange={handleChange}
                  placeholder="e.g., EURUSD"
                  required
                />
              </div>
              <div className="form-group">
                <label>Entry Price</label>
                <input
                  type="number"
                  name="entryPrice"
                  value={formData.entryPrice}
                  onChange={handleChange}
                  step="0.00001"
                  required
                />
              </div>
              <div className="form-group">
                <label>Exit Price</label>
                <input
                  type="number"
                  name="exitPrice"
                  value={formData.exitPrice}
                  onChange={handleChange}
                  step="0.00001"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Lot Size</label>
                <input
                  type="number"
                  name="lotSize"
                  value={formData.lotSize}
                  onChange={handleChange}
                  step="0.01"
                  required
                />
              </div>
              <div className="form-group">
                <label>Entry Date</label>
                <input
                  type="date"
                  name="entryDate"
                  value={formData.entryDate}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Exit Date</label>
                <input
                  type="date"
                  name="exitDate"
                  value={formData.exitDate}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="form-group">
              <label>Notes</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows="3"
              />
            </div>
            <div className="form-actions">
              <button type="submit" className="btn btn-success">Save Trade</button>
              <button type="button" className="btn btn-secondary" onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div className="trades-list">
        {trades.length === 0 ? (
          <p className="no-data">No trades recorded yet. Start tracking your trades!</p>
        ) : (
          <div className="trades-table">
            <table>
              <thead>
                <tr>
                  <th>Symbol</th>
                  <th>Entry Price</th>
                  <th>Exit Price</th>
                  <th>Lot Size</th>
                  <th>Entry Date</th>
                  <th>Exit Date</th>
                  <th>P&L</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {trades.map((trade) => (
                  <tr key={trade.id}>
                    <td>{trade.symbol}</td>
                    <td>${trade.entry_price}</td>
                    <td>${trade.exit_price || '-'}</td>
                    <td>{trade.lot_size}</td>
                    <td>{trade.entry_date}</td>
                    <td>{trade.exit_date || '-'}</td>
                    <td style={{ color: trade.profit_loss > 0 ? '#16a34a' : '#ef4444' }}>
                      {trade.profit_loss ? `$${trade.profit_loss.toFixed(2)}` : '-'}
                    </td>
                    <td>{trade.win_loss ? (trade.win_loss === 'win' ? '✓ Win' : '✗ Loss') : 'Open'}</td>
                    <td>
                      <button className="btn btn-danger" onClick={() => deleteTrade(trade.id)}>
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackRecord;
