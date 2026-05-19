import React from 'react';

export default function Header() {
  return (
    <header className="navbar">
      <div className="nav-brand">
        <span className="brand-icon">🩺</span>
        <h1 className="brand-text">DiabetesIQ</h1>
      </div>
      <div className="academic-badge">
        🏫 Arba Minch University
      </div>
    </header>
  );
}
