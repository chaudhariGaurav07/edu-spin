// src/pages/Home.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./../styles/Home.css";

const Home = () => {
  const navigate = useNavigate();
  const [bgColor, setBgColor] = useState("#f7d794");

  // Handle background color change on mouse move (interactive UI)
  const handleMouseMove = (e) => {
    const { clientX: x, clientY: y } = e;
    const newColor = `rgb(${Math.min(x, 255)}, ${Math.min(y, 255)}, 200)`;
    setBgColor(newColor);
  };

  return (
    <div
      className="home-container"
      style={{ backgroundColor: bgColor }}
      onMouseMove={handleMouseMove}
    >
      <div className="home-content">
        <div className="home-left">
          <img src="/images/left-image.png" alt="Interactive Left" />
        </div>
        <div className="home-right">
          <h1>Welcome to EduSpin</h1>
          <p>Gamify learning and make education fun!</p>
          <button onClick={() => navigate("/game")}>Start Game</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
