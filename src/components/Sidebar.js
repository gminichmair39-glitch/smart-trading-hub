import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, Calculator, TrendingUp, BookOpen, PieChart, FileText, Home } from 'lucide-react';
import './Sidebar.css';

const Sidebar = ({ activeMenu, setActiveMenu }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, path: '/' },
    { id: 'journal', label: 'Trading Journal', icon: FileText, path: '/journal' },
    { id: 'lot-calculator', label: 'Lot Size Calculator', icon: Calculator, path: '/lot-calculator' },
    { id: 'compound-calculator', label: 'Compound Calculator', icon: BarChart3, path: '/compound-calculator' },
    { id: 'track-record', label: 'My Track Record', icon: TrendingUp, path: '/track-record' },
    { id: 'academy', label: 'Academy', icon: BookOpen, path: '/academy' },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo">
          <PieChart size={32} />
          <span>SMART Trading</span>
        </div>
      </div>
      <nav className="sidebar-nav">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.id}
              to={item.path}
              className={`nav-item ${activeMenu === item.id ? 'active' : ''}`}
              onClick={() => setActiveMenu(item.id)}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="sidebar-footer">
        <p className="version">v1.0.0</p>
        <p className="offline-badge">🔒 Offline Mode</p>
      </div>
    </aside>
  );
};

export default Sidebar;
