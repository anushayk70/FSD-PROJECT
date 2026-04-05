import React, { useState } from 'react';
import './App.css';

function App() {
  const [glasses, setGlasses] = useState(0);
  const [steps, setSteps] = useState(0);
  const [calories, setCalories] = useState(0);

  const calculateBurn = () => {
    // 1 step is roughly 0.04 calories
    const result = steps * 0.04;
    setCalories(result.toFixed(2));
  };

  return (
    <div className="App">
      <nav className="navbar">
        <h1>CAMPUSFIT.IO ⚡️</h1>
      </nav>

      <div className="dashboard">
        <div className="card water-card">
          <h3>HYDRATION 💧</h3>
          <div className="counter">{glasses}</div>
          <button className="btn-add" onClick={() => setGlasses(glasses + 1)}>+ ADD SIP</button>
        </div>

        <div className="card steps-card">
          <h3>ACTIVITY 👟</h3>
          <input 
            type="number" 
            placeholder="How many steps?" 
            onChange={(e) => setSteps(e.target.value)} 
          />
          <button className="btn-calc" onClick={calculateBurn}>CALCULATE</button>
        </div>

        <div className="card cal-card">
          <h3>BURNED 🔥</h3>
          <div className="counter">{calories}</div>
          <p>KCAL TOTAL</p>
        </div>
      </div>

      <button className="btn-reset" onClick={() => {setGlasses(0); setSteps(0); setCalories(0)}}>
        RESET DAY
      </button>
    </div>
  );
}

export default App;