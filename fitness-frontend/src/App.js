import React, { useState } from 'react';
import './App.css';

function App() {
  const [page, setPage] = useState(0); 
  const [user, setUser] = useState({ name: '', weight: '', height: '', goal: 'LOSE', bmi: 0, category: '' });
  const [data, setData] = useState({ sips: 0, steps: 0, junk: false, sleep: false });
  const [report, setReport] = useState({ progress: '', note: '' });

  const calculateHealth = (e) => {
    e.preventDefault();
    const bmiVal = (user.weight / ((user.height / 100) ** 2)).toFixed(1);
    let cat = "";
    if (bmiVal < 18.5) cat = "MALNOURISHED ⚠️";
    else if (bmiVal < 24.9) cat = "RIGHT ON TRACK ✨";
    else cat = "OBESE 📈";
    setUser({ ...user, bmi: bmiVal, category: cat });
    setPage(1);
  };

  const generateReport = () => {
    const burned = (data.steps * 0.04) * (user.weight / 70);
    let progressMsg = "";
    if (user.goal === "LOSE") {
      progressMsg = burned > 300 && !data.junk ? "SHREDDING IT! 🔥" : "STAY FOCUSED 🛑";
    } else {
      progressMsg = burned < 200 && data.sleep ? "GAINING MASS! 💪" : "HUSTLE HARDER ⚡️";
    }
    const notes = ["Main character energy,", "You're literally glowing,", "Absolute legend behavior,", "Built different,"];
    const randomNote = notes[Math.floor(Math.random() * notes.length)];
    setReport({ progress: progressMsg, note: randomNote });
    setPage(3);
  };

  return (
    <div className="App">
      <div className="blob-bg"></div>

      {page === 0 && (
        <div className="container fade-in">
          <form className="glass-card" onSubmit={calculateHealth}>
            <h1 className="ultra-title">CAMPUS<span>FIT</span></h1>
            <p className="vibe-text">AUTHENTICATE YOURSELF</p>
            <input type="text" placeholder="NAME" onChange={(e)=>setUser({...user, name: e.target.value})} required />
            <select onChange={(e)=>setUser({...user, goal: e.target.value})} className="nebula-select">
              <option value="LOSE">GOAL: LOSE WEIGHT</option>
              <option value="GAIN">GOAL: GAIN WEIGHT</option>
            </select>
            <div className="row">
              <input type="number" placeholder="KG" onChange={(e)=>setUser({...user, weight: e.target.value})} required />
              <input type="number" placeholder="CM" onChange={(e)=>setUser({...user, height: e.target.value})} required />
            </div>
            <button className="btn-neon">INITIALIZE →</button>
          </form>
        </div>
      )}

      {page === 1 && (
        <div className="container fade-in">
          <div className="glass-card">
            <h2 className="section-header">THE HUSTLE</h2>
            <div className="stat-circle-huge">
              <div className="val-huge">{(data.sips * 0.25).toFixed(2)}L</div>
              <button className="add-btn-neon" onClick={()=>setData({...data, sips: data.sips+1})}>+ DRINK</button>
            </div>
            <input type="number" className="nebula-input" placeholder="ENTER STEPS" onChange={(e)=>setData({...data, steps: e.target.value})} />
            <button className="btn-neon" onClick={()=>setPage(2)}>VIBE CHECK →</button>
          </div>
        </div>
      )}

      {page === 2 && (
        <div className="container fade-in">
          <div className="glass-card">
            <h2 className="section-header">VIBE CHECK</h2>
            <div className="habit-stack">
              <button className={`habit-btn-big ${data.junk ? 'on' : ''}`} onClick={()=>setData({...data, junk: !data.junk})}>ATE JUNK? 🍟</button>
              <button className={`habit-btn-big ${data.sleep ? 'on' : ''}`} onClick={()=>setData({...data, sleep: !data.sleep})}>8H SLEEP? 😴</button>
            </div>
            <button className="btn-neon" onClick={generateReport}>GET MY VIBE ✨</button>
          </div>
        </div>
      )}

      {page === 3 && (
        <div className="container fade-in">
          <div className="glass-card final-glow">
            <div className="streak-badge-huge">🔥 DAY 1 STREAK</div>
            <div className="bmi-pill-neon">{user.category} (BMI: {user.bmi})</div>
            <h1 className="hero-status">{report.progress}</h1>
            <p className="cheer-text">"{report.note} {user.name.toUpperCase()}!"</p>
            <div className="bento-grid">
              <div className="bento-item"><h4>{data.steps}</h4><p>STEPS</p></div>
              <div className="bento-item"><h4>{(data.sips*0.25).toFixed(1)}L</h4><p>WATER</p></div>
            </div>
            <button className="btn-restart" onClick={()=>setPage(1)}>RESET DAY</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;