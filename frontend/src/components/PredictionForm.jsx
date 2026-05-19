import React, { useState } from 'react';

const TEST_CASES = {
  healthy: {
    pregnancies: '1',
    glucose: '85',
    bloodPressure: '66',
    skinThickness: '29',
    insulin: '80',
    bmi: '26.6',
    pedigree: '0.351',
    age: '31'
  },
  diabetic: {
    pregnancies: '6',
    glucose: '148',
    bloodPressure: '72',
    skinThickness: '35',
    insulin: '155',
    bmi: '33.6',
    pedigree: '0.627',
    age: '50'
  }
};

export default function PredictionForm({ onSubmit, loading }) {
  const [formData, setFormData] = useState({
    pregnancies: '',
    glucose: '',
    bloodPressure: '',
    skinThickness: '',
    insulin: '',
    bmi: '',
    pedigree: '',
    age: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const loadTestCase = (type) => {
    setFormData(TEST_CASES[type]);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    // Parse fields to float values
    const features = [
      parseFloat(formData.pregnancies) || 0,
      parseFloat(formData.glucose) || 0,
      parseFloat(formData.bloodPressure) || 0,
      parseFloat(formData.skinThickness) || 0,
      parseFloat(formData.insulin) || 0,
      parseFloat(formData.bmi) || 0,
      parseFloat(formData.pedigree) || 0,
      parseFloat(formData.age) || 0
    ];

    onSubmit(features);
  };

  return (
    <div className="glass-card">
      <h2 className="form-title">Clinical Diagnostic Assessment</h2>
      <p className="form-subtitle">
        Fill out the clinical parameters below. You can also load template cases to verify predictive inference quickly.
      </p>

      {/* Test Cases Shortcuts */}
      <div style={{ display: 'flex', gap: '0.8rem', marginBottom: '2rem' }}>
        <button 
          type="button" 
          className="form-input" 
          style={{ cursor: 'pointer', display: 'flex', gap: '0.5rem', justifyContent: 'center', alignItems: 'center' }}
          onClick={() => loadTestCase('healthy')}
        >
          🟢 Load Healthy Case
        </button>
        <button 
          type="button" 
          className="form-input" 
          style={{ cursor: 'pointer', display: 'flex', gap: '0.5rem', justifyContent: 'center', alignItems: 'center' }}
          onClick={() => loadTestCase('diabetic')}
        >
          🔴 Load Diabetic Case
        </button>
      </div>

      <form onSubmit={handleFormSubmit}>
        <div className="inputs-grid">
          {/* Pregnancies */}
          <div className="form-group">
            <label className="form-label">
              Pregnancies <span className="unit-label">count</span>
            </label>
            <input 
              type="number" 
              name="pregnancies"
              className="form-input"
              value={formData.pregnancies}
              onChange={handleChange}
              placeholder="e.g. 2"
              min="0"
              max="20"
              required 
            />
            <span className="hint-text">Number of times pregnant (0-20)</span>
          </div>

          {/* Glucose */}
          <div className="form-group">
            <label className="form-label">
              Glucose <span className="unit-label">mg/dL</span>
            </label>
            <input 
              type="number" 
              name="glucose"
              className="form-input"
              value={formData.glucose}
              onChange={handleChange}
              placeholder="e.g. 120"
              min="0"
              max="300"
              required 
            />
            <span className="hint-text">Plasma glucose concentration</span>
          </div>

          {/* Blood Pressure */}
          <div className="form-group">
            <label className="form-label">
              Blood Pressure <span className="unit-label">mm Hg</span>
            </label>
            <input 
              type="number" 
              name="bloodPressure"
              className="form-input"
              value={formData.bloodPressure}
              onChange={handleChange}
              placeholder="e.g. 80"
              min="0"
              max="200"
              required 
            />
            <span className="hint-text">Diastolic blood pressure</span>
          </div>

          {/* Skin Thickness */}
          <div className="form-group">
            <label className="form-label">
              Skin Thickness <span className="unit-label">mm</span>
            </label>
            <input 
              type="number" 
              name="skinThickness"
              className="form-input"
              value={formData.skinThickness}
              onChange={handleChange}
              placeholder="e.g. 20"
              min="0"
              max="100"
              required 
            />
            <span className="hint-text">Triceps skin fold thickness</span>
          </div>

          {/* Insulin */}
          <div className="form-group">
            <label className="form-label">
              Insulin Level <span className="unit-label">μU/mL</span>
            </label>
            <input 
              type="number" 
              name="insulin"
              className="form-input"
              value={formData.insulin}
              onChange={handleChange}
              placeholder="e.g. 80"
              min="0"
              max="900"
              required 
            />
            <span className="hint-text">2-Hour serum insulin level</span>
          </div>

          {/* BMI */}
          <div className="form-group">
            <label className="form-label">
              BMI <span className="unit-label">kg/m²</span>
            </label>
            <input 
              type="number" 
              name="bmi"
              className="form-input"
              value={formData.bmi}
              onChange={handleChange}
              placeholder="e.g. 24.5"
              step="0.1"
              min="0"
              max="80"
              required 
            />
            <span className="hint-text">Body Mass Index value</span>
          </div>

          {/* Diabetes Pedigree Function */}
          <div className="form-group">
            <label className="form-label">
              Pedigree Score <span className="unit-label">ratio</span>
            </label>
            <input 
              type="number" 
              name="pedigree"
              className="form-input"
              value={formData.pedigree}
              onChange={handleChange}
              placeholder="e.g. 0.45"
              step="0.001"
              min="0"
              max="3"
              required 
            />
            <span className="hint-text">Genetic risk pedigree score</span>
          </div>

          {/* Age */}
          <div className="form-group">
            <label className="form-label">
              Patient Age <span className="unit-label">years</span>
            </label>
            <input 
              type="number" 
              name="age"
              className="form-input"
              value={formData.age}
              onChange={handleChange}
              placeholder="e.g. 35"
              min="1"
              max="120"
              required 
            />
            <span className="hint-text">Age of patient in years</span>
          </div>
        </div>

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? (
            <>
              <div className="spinner" />
              <span>Analyzing Risk...</span>
            </>
          ) : (
            <>
              <span>🔍 Run Risk Assessment</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
