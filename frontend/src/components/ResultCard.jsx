import React, { useState, useEffect } from 'react';

export default function ResultCard({ result, loading }) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let interval = null;
    if (loading) {
      setSeconds(0);
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      setSeconds(0);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [loading]);

  if (loading) {
    let statusText = "Initializing diagnostic analysis...";
    let stageTitle = "Connecting";
    let progressPercentage = 5;

    if (seconds < 3) {
      statusText = "Establishing connection to the prediction server API...";
      stageTitle = "Connecting...";
      progressPercentage = 10;
    } else if (seconds < 12) {
      statusText = "Render server waking up from sleep mode. Please hold...";
      stageTitle = "Waking up Server...";
      progressPercentage = 28;
    } else if (seconds < 25) {
      statusText = "Booting python runtime environment and mounting models directory...";
      stageTitle = "Booting Environment...";
      progressPercentage = 50;
    } else if (seconds < 40) {
      statusText = "Loading ML libraries and serializing joblib weights...";
      stageTitle = "Loading Predictor Engine...";
      progressPercentage = 75;
    } else if (seconds < 52) {
      statusText = "Performing standard scaling transformations on your inputs...";
      stageTitle = "Preprocessing Features...";
      progressPercentage = 90;
    } else {
      statusText = "Inference complete! Fetching diagnostic probability scores...";
      stageTitle = "Finalizing...";
      progressPercentage = 97;
    }

    return (
      <div className="glass-card loading-active">
        <div className="loading-header">
          <div className="pulse-spinner">🩺</div>
          <span className="timer-badge">Elapsed: {seconds}s</span>
        </div>
        
        <h3 className="loading-title">{stageTitle}</h3>
        <p className="loading-body">{statusText}</p>

        {/* Custom Progress Bar */}
        <div className="progress-container">
          <div className="progress-bar-bg">
            <div 
              className="progress-bar-fill" 
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <div className="progress-labels">
            <span>0%</span>
            <span>Est: 50s</span>
            <span>100%</span>
          </div>
        </div>

        {/* Informative Note to prevent user from leaving */}
        <div className="free-tier-notice">
          <span className="notice-icon">💡</span>
          <div className="notice-content">
            <h4 className="notice-title">Render Free-Tier Server Alert</h4>
            <p className="notice-text">
              The backend hosting spins down after inactivity. If the server was asleep, this initial startup takes **45 to 60 seconds**. Subsequent tests will run instantly! Thank you for waiting.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="glass-card welcome-card">
        <div className="welcome-icon">🏥</div>
        <h3 className="welcome-title">Ready for Analysis</h3>
        <p className="welcome-body">
          Enter the patient's diagnostic clinical measurements on the left. The system will predict diabetes risk with associated probability confidence.
        </p>
      </div>
    );
  }

  const isDiabetic = result.prediction === 1;
  const percentage = Math.round(result.probability * 100);

  return (
    <div className="glass-card result-active">
      <div className="result-header">
        <div className={`result-badge ${isDiabetic ? 'diabetic' : 'non-diabetic'}`}>
          {isDiabetic ? 'Diabetic Risk Detected' : 'Non-Diabetic Status'}
        </div>
      </div>

      <div className="probability-container">
        <div className="probability-header">
          <span>Prediction Confidence</span>
          <span>{percentage}%</span>
        </div>
        <div className="probability-bar-bg">
          <div 
            className={`probability-bar-fill ${isDiabetic ? 'diabetic' : 'non-diabetic'}`} 
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      <div className="results-metrics-summary">
        <div className="metric-row">
          <span className="metric-label">Assigned Label:</span>
          <span className="metric-value">{result.label}</span>
        </div>
        <div className="metric-row">
          <span className="metric-label">Classifier Engine:</span>
          <span className="metric-value">Random Forest Classifier</span>
        </div>
        <div className="metric-row">
          <span className="metric-label">Model Accuracy:</span>
          <span className="metric-value">86.36%</span>
        </div>
        <div className="metric-row">
          <span className="metric-label">Reference Group:</span>
          <span className="metric-value">Pima Indians Heritage</span>
        </div>
      </div>

      <div className="disclaimer-box">
        <span className="disclaimer-icon">⚠️</span>
        <p className="disclaimer-text">
          <strong>Medical Disclaimer:</strong> This application is a screening assistance prototype and is not a medical diagnosis. The classification results should not replace professional clinical evaluation or advice.
        </p>
      </div>
    </div>
  );
}
