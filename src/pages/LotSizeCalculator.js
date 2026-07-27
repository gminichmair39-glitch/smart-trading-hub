import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './Calculator.css';

const LotSizeCalculator = () => {
  const [inputs, setInputs] = useState({
    accountBalance: '',
    riskPercent: 2,
    entryPrice: '',
    stopLoss: '',
  });
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const calculateLotSize = async (e) => {
    e.preventDefault();
    const { accountBalance, riskPercent, entryPrice, stopLoss } = inputs;

    if (!accountBalance || !entryPrice || !stopLoss) {
      alert('Please fill in all required fields');
      return;
    }

    const riskAmount = (accountBalance * riskPercent) / 100;
    const priceDistance = Math.abs(entryPrice - stopLoss);
    const lotSize = riskAmount / priceDistance;

    setResult({
      riskAmount: riskAmount.toFixed(2),
      lotSize: lotSize.toFixed(4),
      pipValue: (riskAmount / (priceDistance * 10)).toFixed(2),
    });

    // Save to history
    try {
      const id = uuidv4();
      const now = new Date().toISOString();
      await window.electron.db.run(
        `INSERT INTO calculator_history (id, calculator_type, inputs, result, created_at)
         VALUES (?, ?, ?, ?, ?)`,
        [
          id,
          'lot-size',
          JSON.stringify(inputs),
          JSON.stringify({ riskAmount: riskAmount.toFixed(2), lotSize: lotSize.toFixed(4) }),
          now,
        ]
      );
    } catch (error) {
      console.error('Error saving calculation:', error);
    }
  };

  return (
    <div className="calculator">
      <h1>Lot Size Calculator</h1>
      <div className="calculator-container">
        <div className="calculator-form">
          <form onSubmit={calculateLotSize}>
            <div className="form-group">
              <label>Account Balance ($)</label>
              <input
                type="number"
                name="accountBalance"
                value={inputs.accountBalance}
                onChange={handleChange}
                placeholder="Enter account balance"
              />
            </div>
            <div className="form-group">
              <label>Risk Percentage (%)</label>
              <input
                type="number"
                name="riskPercent"
                value={inputs.riskPercent}
                onChange={handleChange}
                min="0.1"
                max="5"
                step="0.1"
              />
            </div>
            <div className="form-group">
              <label>Entry Price ($)</label>
              <input
                type="number"
                name="entryPrice"
                value={inputs.entryPrice}
                onChange={handleChange}
                placeholder="Enter entry price"
              />
            </div>
            <div className="form-group">
              <label>Stop Loss Price ($)</label>
              <input
                type="number"
                name="stopLoss"
                value={inputs.stopLoss}
                onChange={handleChange}
                placeholder="Enter stop loss price"
              />
            </div>
            <button type="submit" className="btn btn-primary calculate-btn">
              Calculate Lot Size
            </button>
          </form>
        </div>

        {result && (
          <div className="result-container">
            <h2>Calculation Results</h2>
            <div className="result-box">
              <div className="result-item">
                <span className="label">Risk Amount:</span>
                <span className="value">${result.riskAmount}</span>
              </div>
              <div className="result-item">
                <span className="label">Lot Size:</span>
                <span className="value">{result.lotSize}</span>
              </div>
              <div className="result-item">
                <span className="label">Pip Value:</span>
                <span className="value">${result.pipValue}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LotSizeCalculator;
