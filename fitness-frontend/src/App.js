import React, { useState } from 'react';
import './App.css';

function App() {
  const [page, setPage] = useState(0); 
  const [user, setUser] = useState({ name: '', weight: '', height: '', goal: 'LOSE', id: '', bmi: 0, category: '' });
  const [data, setData] = useState({ sips: 0, steps: 0, junk: false, sleep: false });
  const [report, setReport] = useState({ progress: '', note: '' });
  const [history, setHistory] = useState([]); // Stores the history from MySQL

  // 1. REGISTER / LOGIN (Page 0)
  const calculateHealth = async (e) => {
    e.preventDefault();
    
    const payload = {
      studentId: user.id,
      fullName: user.name,
      weight: parseFloat(user.weight),
      height: parseFloat(user.height),
      goal: user.goal
    };

    try {
      // We try to register the user
      const response = await fetch('http://localhost:8080/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      // If ID exists or registration is successful, move forward
      if (response.ok || response.status === 400) {
        const bmiVal = (user.weight / ((user.height / 100) ** 2)).toFixed(1);
        let cat = bmiVal < 18.5 ? "UNDERWEIGHT ⚠️" : bmiVal < 24.9 ? "HEALTHY ✨" : "OVERWEIGHT 📈";
        setUser({ ...user, bmi: bmiVal, category: cat });
        setPage(1);
      }
    } catch (err) {
      alert("Backend is offline! 💀 Check your Java Terminal.");
    }
  };

  // 2. SAVE DAILY DATA & FETCH HISTORY (Page 2)
  const generateReport = async () => {
    const dailyData = {
      studentId: user.id,
      steps: parseInt(data.steps) || 0,
      waterLitres: parseFloat((data.sips * 0.25).toFixed(2)),
      ateJunk: data.junk,
      sleptWell: data.sleep
    };

    try {
      // SAVE today's hustle to MySQL
      await fetch('http://localhost:8080/api/users/log-day', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dailyData)
      });

      // FETCH all history for this user
      const historyRes = await fetch(`http://localhost:8080/api/users/history/${user.id}`);
      const historyList = await historyRes.json();
      setHistory(historyList);

      // Report UI Logic
      const burned = (data.steps * 0.04) * (user.weight / 70);
      let progressMsg = burned > 300 ? "GOAT STATUS! 🔥" : "KEEP PUSHING ⚡️";
      setReport({ progress: progressMsg, note: "Data synced to MySQL." });
      setPage(3);
    } catch (err) {
      alert("Failed to sync with Database! 🛑");
    }
  };

  return (
    <div className="App">
      <div className="blob-bg"></div>

      {/* PAGE 0: AUTHENTICATION */}
      {page === 0 && (
        <div className="container fade-in">
          <form className="glass-card" onSubmit={calculateHealth}>
            <h1 className="ultra-title">CAMPUS<span>FIT</span></h1>
            <p className="vibe-text">ENTER STUDENT CREDENTIALS</p>
            <input type="text" placeholder="FULL NAME" onChange={(e)=>setUser({...user, name: e.target.value})} required />
            <input type="text" placeholder="STUDENT ID" onChange={(e)=>setUser({...user, id: e.target.value})} required />
            <div className="row">
              <input type="number" placeholder="WEIGHT (KG)" onChange={(e)=>setUser({...user, weight: e.target.value})} required />
              <input type="number" placeholder="HEIGHT (CM)" onChange={(e)=>setUser({...user, height: e.target.value})} required />
            </div>
            <button className="btn-neon">INITIALIZE →</button>
          </form>
        </div>
      )}

      {/* PAGE 1: DAILY HUSTLE */}
      {page === 1 && (
        <div className="container fade-in">
          <div className="glass-card">
            <h2 className="section-header">THE HUSTLE</h2>
            <div className="stat-circle-huge">
              <div className="val-huge">{(data.sips * 0.25).toFixed(2)}L</div>
              <button className="add-btn-neon" onClick={()=>setData({...data, sips: data.sips+1})}>+ WATER</button>
            </div>
            <input type="number" className="nebula-input" placeholder="STEPS WALKED" onChange={(e)=>setData({...data, steps: e.target.value})} />
            <button className="btn-neon" onClick={()=>setPage(2)}>VIBE CHECK →</button>
          </div>
        </div>
      )}

      {/* PAGE 2: HABIT CHECK */}
      {page === 2 && (
        <div className="container fade-in">
          <div className="glass-card">
            <h2 className="section-header">VIBE CHECK</h2>
            <div className="habit-stack">
              <button className={`habit-btn-big ${data.junk ? 'on' : ''}`} onClick={()=>setData({...data, junk: !data.junk})}>ATE JUNK? 🍟</button>
              <button className={`habit-btn-big ${data.sleep ? 'on' : ''}`} onClick={()=>setData({...data, sleep: !data.sleep})}>8H SLEEP? 😴</button>
            </div>
            <button className="btn-neon" onClick={generateReport}>SAVE & VIEW HISTORY ✨</button>
          </div>
        </div>
      )}

      {/* PAGE 3: HISTORY & RESULTS */}
      {page === 3 && (
        <div className="container fade-in">
          <div className="glass-card final-glow">
            <div className="streak-badge-huge">✅ RECORDS SYNCED</div>
            <h1 className="hero-status">{report.progress}</h1>
            
            <div className="history-box">
              <h3 className="history-title">📜 ACTIVITY LOG</h3>
              <div className="history-list">
                {history.slice(0).reverse().map((item, i) => (
                  <div key={i} className="history-item">
                    <span className="h-date">{item.date}</span>
                    <span className="h-data">👣 {item.steps}</span>
                    <span className="h-data">💧 {item.waterLitres}L</span>
                  </div>
                ))}
              </div>
            </div>

            <button className="btn-restart" onClick={()=>setPage(1)}>LOG ANOTHER DAY</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;