import React, { useState } from 'react';
import './signIn.css';

// --- DEMO CREDENTIALS ---
const DEMO_USER = {
  email: "admin@dev.com",
  password: "password123",
  name: "Kensey McDowell",
  role: "Developer Admin",
  location: "Murfreesboro / Tennessee"
};

// We pass { onLoginSuccess } as a prop from App.jsx
export default function AuthPage({ onLoginSuccess }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isChanging, setIsChanging] = useState(false);
  
  // Form States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Toggle Shutter Animation
  const handleToggle = () => {
    setIsChanging(true);
    setError('');
    setTimeout(() => setIsSignUp(!isSignUp), 500);
    setTimeout(() => setIsChanging(false), 1000);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    
    if (email === DEMO_USER.email && password === DEMO_USER.password) {
      setIsChanging(true); 
      
      setTimeout(() => {
        onLoginSuccess(); 
      }, 600);
    } else {
      setError("ACCESS DENIED: INVALID CREDENTIALS");
    }
  };

  return (
    <div className={`auth-stage ${isSignUp ? 'mode-signup' : 'mode-signin'}`}>
      
      {/* BLACK SHUTTER PANEL */}
      <div className="shutter-panel">
        <div className="shutter-content">
          <div className={`msg-box ${isSignUp ? 'hide' : 'show'}`}>
            <h2 style={{color: 'white'}}>NEW TO FORECASTING?</h2>
            <button className="ghost-btn" onClick={handleToggle}>JOIN NOW</button>
          </div>
          <div className={`msg-box ${isSignUp ? 'show' : 'hide'}`}>
            <h2 style={{color: 'white'}}>RETURNING ANALYST?</h2>
            <button className="ghost-btn" onClick={handleToggle}>SIGN IN</button>
          </div>
        </div>
      </div>

      {/* FORM AREA */}
      <div className={`form-area ${isChanging ? 'form-invisible' : 'form-visible'}`}>
        {!isSignUp ? (
          /* SIGN IN FORM */
          <form className="form-node" onSubmit={handleLogin}>
            <h1>SIGN IN</h1>
            {error && <p style={{color: 'red', fontSize: '10px', marginBottom: '10px', letterSpacing: '1px'}}>{error}</p>}
            
            <input 
              type="email" 
              placeholder="EMAIL" 
              className="vogue-input" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
            <input 
              type="password" 
              placeholder="PASSWORD" 
              className="vogue-input" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
            <button type="submit" className="submit-btn">ACCESS PORTAL</button>
          </form>
        ) : (
          /* REGISTER FORM */
          <div className="form-node">
            <h1>REGISTER</h1>
            <input type="text" placeholder="FULL NAME" className="vogue-input" />
            <input type="email" placeholder="EMAIL" className="vogue-input" />
            <input type="password" placeholder="PASSWORD" className="vogue-input" />
            <button className="submit-btn" onClick={handleToggle}>CREATE ACCOUNT</button>
          </div>
        )}
      </div>
    </div>
  );
}