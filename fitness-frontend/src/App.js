import React, { useState } from 'react';
import './App.css';

function App() {
  const [user, setUser] = useState({ name: '', weight: '', height: '', id: '' });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [glasses, setGlasses] = useState(0);
  const [steps, setSteps] = useState(0);
  const [burned, setBurned] = useState(0);

  const handleLogin = (e) => {
    e.preventDefault();
    if(user.name && user.id) setIsLoggedIn(true);
  };

  const calculateBurn = () => {
    // Advanced formula: (Steps * 0.04) * (Weight / 70) 
    // This makes it personalized to the user's weight!
    const factor = user.weight / 70;
    const result = (steps * 0.04) * factor;
    setBurned(result.toFixed(2));
  };

  if (!isLoggedIn) {
    return (
      <div className="login-screen">
        <form className="login-card" onSubmit={handleLogin}>
          <h1>CAMPUSFIT.IO ⚡️</h1>
          <p>Create your Athlete Profile</p>
          <input type="text" placeholder="Full Name" onChange={(e) => setUser({...user, name: e.target.value})} required />
          <input type="text" placeholder="Unique Student ID" onChange={(e) => setUser({...user, id: e.target.value})} required />
          <div className="input-group">
            <input type="number" placeholder="Weight (kg)" onChange={(e) => setUser({...user, weight: e.target.value})} required />
            <input type="number" placeholder="Height (cm)" onChange={(e) => setUser({...user, height: e.target.value})} required />
          </div>
          <button type="submit" className="btn-add">START TRACKING</button>
        </form>
      </div>
    );
  }

  return (
    <div className="App">
      <nav className="navbar">
        <h1>Welcome, {user.name} 🦾</h1>
        <p>ID: {user.id} | {user.weight}kg | {user.height}cm</p>
      </nav>

      <div className="dashboard">
        <div className="card water-card">
          <h3>HYDRATION 💧</h3>
          <div className="counter">{glasses}</div>
          <button className="btn-add" onClick={() => setGlasses(glasses + 1)}>+ SIP</button>
        </div>

        <div className="card steps-card">
          <h3>ACTIVITY 👟</h3>
          <input type="number" placeholder="Steps" onChange={(e) => setSteps(e.target.value)} />
          <button className="btn-calc" onClick={calculateBurn}>CALCULATE</button>
        </div>

        <div className="card cal-card">
          <h3>BURNED 🔥</h3>
          <div className="counter">{burned}</div>
          <p>KCAL BASED ON WEIGHT</p>
        </div>
      </div>
    </div>
  );
}

export default App;