import React, { useState } from 'react';
import './App.css';

function App() {
  // 'useState' is a React hook to store data that changes (like your water count)
  const [glasses, setGlasses] = useState(0);

  // Function to add a glass of water
  const addGlass = () => {
    setGlasses(glasses + 1);
  };

  // Function to reset the day
  const resetCount = () => {
    setGlasses(0);
  };

  return (
    <div className="App">
      <nav className="navbar">
        <h1>CampusFit 🎓</h1>
      </nav>

      <div className="dashboard">
        <div className="card">
          <h2>Daily Hydration</h2>
          <p>Goal: 8 Glasses</p>
          <div className="water-display">
            <span className="glass-icon">💧</span>
            <span className="counter">{glasses}</span>
          </div>
          
          <div className="button-group">
            <button className="btn-add" onClick={addGlass}>+ Add Glass</button>
            <button className="btn-reset" onClick={resetCount}>Reset</button>
          </div>
        </div>

        {/* We will add Step Counter here next! */}
      </div>
    </div>
  );
}

export default App;