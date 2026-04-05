import React, { useState } from 'react';
import './App.css';

function App() {
  // User Profile States
  const [user, setUser] = useState({ name: '', weight: '', height: '', id: '' });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState("");

  // Fitness Tracker States
  const [glasses, setGlasses] = useState(0);
  const [steps, setSteps] = useState(0);
  const [burned, setBurned] = useState(0);
  const [status, setStatus] = useState("STABLE ⚖️");

  const handleLogin = (e) => {
    e.preventDefault();
    // Logic: In the future, Java will check if this ID is unique
    if (user.id.length < 3) {
      setError("ID TOO SHORT, BESTIE. 💀");
    } else {
      setIsLoggedIn(true);
      setError("");
    }
  };

  const calculateFitness = () => {
    // Harris-Benedict influenced calculation
    const weightFactor = user.weight / 70;
    const caloriesBurned = (steps * 0.04) * weightFactor;
    setBurned(caloriesBurned.toFixed(2));

    // Weight Trend Logic
    if (caloriesBurned > 400) {
      setStatus("LOSING 🔥");
    } else if (steps < 1500 && steps > 0) {
      setStatus("GAINING 📈");
    } else {
      setStatus("STABLE ⚖️");
    }
  };

  // --- LOGIN SCREEN VIEW ---
  if (!isLoggedIn) {
    return (
      <div className="login-screen">
        <form className="login-card" onSubmit={handleLogin}>
          <div className="badge">v1.0.4</div>
          <h1>CAMPUSFIT.IO ⚡️</h1>
          <p>Create your Athlete Profile</p>
          
          {error && <div className="error-msg">{error}</div>}
          
          <input type="text" placeholder="Full Name" onChange={(e) => setUser({...user, name: e.target.value})} required />
          <input type="text" placeholder="Unique Student ID" onChange={(e) => setUser({...user, id: e.target.value})} required />
          
          <div className="input-group">
            <input type="number" placeholder="Weight (kg)" onChange={(e) => setUser({...user, weight: e.target.value})} required />
            <input type="number" placeholder="Height (cm)" onChange={(e) => setUser({...user, height: e.target.value})} required />
          </div>
          
          <button type="submit" className="btn-main">START HUSTLE</button>
        </form>
      </div>
    );
  }

  // --- MAIN DASHBOARD VIEW ---
  return (
    <div className="App">
      <nav className="navbar">
        <div className="nav-content">
          <h1>WELCOME, {user.name.toUpperCase()} 🦾</h1>
          <div className="user-stats-pill">
            ID: {user.id} • {user.weight}kg • {user.height}cm
          </div>
        </div>
      </nav>

      <div className="dashboard">
        {/* Card 1: Water */}
        <div className="card water-card">
          <h3>HYDRATION</h3>
          <div className="counter">{glasses}</div>
          <p>GLASSES</p>
          <button className="btn-action" onClick={() => setGlasses(glasses + 1)}>+ SIP</button>
        </div>

        {/* Card 2: Steps */}
        <div className="card steps-card">
          <h3>ACTIVITY</h3>
          <div className="counter">{steps || 0}</div>
          <input type="number" placeholder="Steps?" onChange={(e) => setSteps(e.target.value)} />
          <button className="btn-action" onClick={calculateFitness}>CALCULATE</button>
        </div>

        {/* Card 3: Calories */}
        <div className="card cal-card">
          <h3>BURNED</h3>
          <div className="counter">{burned}</div>
          <p>KCAL TOTAL</p>
        </div>

        {/* Card 4: Weight Status */}
        <div className="card status-card">
          <h3>STATUS</h3>
          <div className="counter status-text">{status}</div>
          <p>WEIGHT TREND</p>
        </div>
      </div>

      <button className="btn-reset" onClick={() => window.location.reload()}>
        LOGOUT & RESET
      </button>
    </div>
  );
}

export default App;