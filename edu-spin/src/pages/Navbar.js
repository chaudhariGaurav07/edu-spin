import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./../styles/Navbar.css";

function Navbar() {
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();

  const toggleNavbar = () => {
    setIsActive(!isActive);
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    navigate("/login");
  };

  return (
    <nav className={`navbar ${isActive ? "active" : ""}`}>
      {/* Hamburger Menu */}
      <div className="hamburger" onClick={toggleNavbar}>
        ☰
      </div>

      {/* Navbar Links */}
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/game">Game</a></li>
        <li><a href="/draw-learn">Draw & Learn</a></li>
        <li><a href="/puzzle-match">Puzzle & Match</a></li>
        <li><a href="/math-playground">Math Playground</a></li>
        <li><a href="/story-mode">Story Mode</a></li>
        <li><a href="/video-learning">Video Learning</a></li>
        <li><a href="/dashboard">Dashboard</a></li>
        <li>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
