import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          ForeMT <span className="logo-thin">FASHION</span>
        </Link>

        <div className="nav-links">
          {/* Dropdown 1: Forecasting */}
          <div className="dropdown">
            <button className="dropbtn">Forecasting</button>
            <div className="dropdown-content">
              <Link to="/trend">Trend Forecasting</Link>
              <Link to="/color">Color Forecasting</Link>
              <Link to="/market">Market Research</Link>
            </div>
          </div>

          {/* Dropdown 2: Reviews */}
          <div className="dropdown">
            <button className="dropbtn">Reviews</button>
            <div className="dropdown-content">
              <Link to="/fashion">Fashion Week</Link>
              <Link to="/street">Street Style</Link>
            </div>
          </div>
          <Link to="/about">About Us</Link>
        </div>

        <div className="nav-links"><Link to="collage">Create</Link></div>
      </div>
    </nav>
  );
}