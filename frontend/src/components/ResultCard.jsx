import React from 'react';

export default function ResultCard({ result, loading }) {
  if (loading) {
    return (
      <div className="glass-card welcome-card">
        <div className="welcome-icon">⚡</div>
        <h3 className="welcome-title">Analyzing Patient Data</h3>
        <p className="welcome-body">Running inference using pre-trained Random Forest model...</p>
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
