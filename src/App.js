import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import TradingJournal from './pages/TradingJournal';
import LotSizeCalculator from './pages/LotSizeCalculator';
import CompoundCalculator from './pages/CompoundCalculator';
import TrackRecord from './pages/TrackRecord';
import Academy from './pages/Academy';
import './App.css';

function App() {
  const [activeMenu, setActiveMenu] = useState('dashboard');

  return (
    <Router>
      <div className="app-container">
        <Sidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/journal" element={<TradingJournal />} />
            <Route path="/lot-calculator" element={<LotSizeCalculator />} />
            <Route path="/compound-calculator" element={<CompoundCalculator />} />
            <Route path="/track-record" element={<TrackRecord />} />
            <Route path="/academy" element={<Academy />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
