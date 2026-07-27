import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './Dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalTrades: 0,
    winRate: 0,
    totalProfit: 0,
    journalEntries: 0,
  });

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const trades = await window.electron.db.query('SELECT * FROM trades');
      const journal = await window.electron.db.query('SELECT * FROM journal_entries');

      const winTrades = trades.filter((t) => t.profit_loss > 0).length;
      const totalProfit = trades.reduce((sum, t) => sum + (t.profit_loss || 0), 0);

      setStats({
        totalTrades: trades.length,
        winRate: trades.length > 0 ? ((winTrades / trades.length) * 100).toFixed(2) : 0,
        totalProfit: totalProfit.toFixed(2),
        journalEntries: journal.length,
      });
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    }
  };

  const data = [
    { name: 'Jan', value: 4000 },
    { name: 'Feb', value: 3000 },
    { name: 'Mar', value: 2000 },
    { name: 'Apr', value: 2780 },
    { name: 'May', value: 1890 },
    { name: 'Jun', value: 2390 },
  ];

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Trades</h3>
          <p className="stat-value">{stats.totalTrades}</p>
        </div>
        <div className="stat-card">
          <h3>Win Rate</h3>
          <p className="stat-value">{stats.winRate}%</p>
        </div>
        <div className="stat-card">
          <h3>Total Profit/Loss</h3>
          <p className={`stat-value ${stats.totalProfit >= 0 ? 'positive' : 'negative'}`}>
            ${stats.totalProfit}
          </p>
        </div>
        <div className="stat-card">
          <h3>Journal Entries</h3>
          <p className="stat-value">{stats.journalEntries}</p>
        </div>
      </div>

      <div className="chart-container">
        <h2>Profit/Loss Over Time</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#0f3460" />
            <XAxis dataKey="name" stroke="#a0aec0" />
            <YAxis stroke="#a0aec0" />
            <Tooltip contentStyle={{ backgroundColor: '#0f3460', border: 'none', borderRadius: '8px' }} />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#16a34a" strokeWidth={2} dot={{ fill: '#16a34a' }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;
