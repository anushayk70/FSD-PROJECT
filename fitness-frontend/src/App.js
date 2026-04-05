import React, { useState } from 'react';
import './App.css';

function App() {
  const [glasses, setGlasses] = useState(0);
  const [steps, setSteps] = useState(0); // New state for steps
  const [calories, setCalories] = useState(0); // New state for calories

  return (
    <div className="App">
      <nav className="navbar">
        <h1>CampusFit 🎓</h1>
      </nav>

      <div className="dashboard">
        {/* Water Tracker Card */}
        <div className="card water-card">
          <h2>Hydration</h2>
          <div className="counter">{glasses}</div>
          <p>Glasses</p>
          <button className="btn-add" onClick={() => setGlasses(glasses + 1)}>+ Add</button>
        </div>

        {/* Step Tracker Card */}
        <div className="card steps-card">
          <h2>Activity</h2>
          <div className="counter">{steps}</div>
          <p>Steps Today</p>
          <input 
            type="number" 
            placeholder="Enter steps" 
            onChange={(e) => setSteps(e.target.value)} 
          />
        </div>

        {/* Calories Card */}
        <div className="card cal-card">
          <h2>Burned</h2>
          <div className="counter">{calories}</div>
          <p>Calories</p>
          <input 
            type="number" 
            placeholder="Enter cal" 
            onChange={(e) => setCalories(e.target.value)} 
          />
        </div>
      </div>
      
      <button className="btn-reset" onClick={() => {setGlasses(0); setSteps(0); setCalories(0);}}>
        Reset All Data
      </button>
    </div>
  );
}

export default App;