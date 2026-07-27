import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './Calculator.css';

const CompoundCalculator = () => {
  const [inputs, setInputs] = useState({
    principal: '',
    monthlyReturn: '',
    months: 12,
  });
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const calculateCompound = async (e) => {
    e.preventDefault();
    const { principal, monthlyReturn, months } = inputs;

    if (!principal || !monthlyReturn || !months) {
      alert('Please fill in all required fields');
      return;
    }

    const principalAmount = parseFloat(principal);
    const monthlyReturnPercent = parseFloat(monthlyReturn) / 100;
    const monthCount = parseInt(months);

    let balance = principalAmount;
    const monthlyData = [];

    for (let i = 1; i <= monthCount; i++) {
      balance = balance * (1 + monthlyReturnPercent);
      monthlyData.push({
        month: i,
        balance: balance.toFixed(2),
      });
    }

    const finalAmount = balance.toFixed(2);
    const totalProfit = (finalAmount - principalAmount).toFixed(2);
    const roi = ((totalProfit / principalAmount) * 100).toFixed(2);

    setResult({
      finalAmount,
      totalProfit,
      roi,
      monthlyData,
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
          'compound',
          JSON.stringify(inputs),
          JSON.stringify({ finalAmount, totalProfit, roi }),
          now,
        ]
      );
    } catch (error) {
      console.error('Error saving calculation:', error);
    }
  };

  return (
    <div className="calculator">
      <h1>Compound Calculator</h1>
      <div className="calculator-container">
        <div className="calculator-form">
          <form onSubmit={calculateCompound}>
            <div className="form-group">
              <label>Initial Capital ($)</label>
              <input
                type="number"
                name="principal"
                value={inputs.principal}
                onChange={handleChange}
                placeholder="Enter initial capital"
              />
            </div>
            <div className="form-group">
              <label>Monthly Return (%)</label>
              <input
                type="number"
                name="monthlyReturn"
                value={inputs.monthlyReturn}
                onChange={handleChange}
                placeholder="Enter monthly return percentage"
                step="0.1"
              />
            </div>
            <div className="form-group">
              <label>Number of Months</label>
              <input
                type="number"
                name="months"
                value={inputs.months}
                onChange={handleChange}
                min="1"
                max="120"
              />
            </div>
            <button type="submit" className="btn btn-primary calculate-btn">
              Calculate Compound Growth
            </button>
          </form>
        </div>

        {result && (
          <div className="result-container">
            <h2>Calculation Results</h2>
            <div className="result-box">
              <div className="result-item">
                <span className="label">Final Amount:</span>
                <span className="value">${result.finalAmount}</span>
              </div>
              <div className="result-item">
                <span className="label">Total Profit:</span>
                <span className="value">${result.totalProfit}</span>
              </div>
              <div className="result-item">
                <span className="label">ROI:</span>
                <span className="value">{result.roi}%</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompoundCalculator;
