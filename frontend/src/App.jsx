import React, { useState } from 'react';
import axios from 'axios';

import Header from './components/Header';
import PredictionForm from './components/PredictionForm';
import ResultCard from './components/ResultCard';
import './App.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function App() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePredict = async (features) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      // POST request to Flask endpoint
      const response = await axios.post(`${API_URL}/predict`, { features });
      setResult(response.data);
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError('Unable to connect to the Flask prediction backend. Ensure the server is running on port 5000.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <Header />
      
      <main className="main-content">
        <div className="left-section">
          {error && (
            <div className="error-card">
              <span>⚠️</span>
              <span>{error}</span>
            </div>
          )}
          <PredictionForm onSubmit={handlePredict} loading={loading} />
        </div>
        
        <div className="right-section">
          <ResultCard result={result} loading={loading} />
        </div>
      </main>

      <footer className="footer">
        <p>© 2026 DiabetesIQ Project — Fundamentals of Machine Learning Course</p>
        <p>Arba Minch University • Department of Software Engineering</p>
        <div className="group-members">
          <span>Eyasu Zerihun (NSR/331/16)</span> • 
          <span> Misker Genene (NSR/1450/16)</span> • 
          <span> Biruk Getahun (NSR/204/16)</span> • 
          <span> Heran Mohamed (NSR/16)</span> • 
          <span> Hlina Kitachew (NSR/500/16)</span>
        </div>
      </footer>
    </div>
  );
}
