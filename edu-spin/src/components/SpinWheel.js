import React, { useState } from "react";
import "./SpinWheel.css";

const SpinWheel = ({ onSpin }) => {
  const [spinning, setSpinning] = useState(false);
  const categories = ["Math", "Spelling", "Shapes", "Colors"];

  const questions = {
    Math: {
      question: "What is 2 + 2?",
      options: ["3", "4", "5", "6"],
      correctAnswer: "4"
    },
    Spelling: {
      question: "How do you spell 'Cat'?",
      options: ["C-A-T", "C-T-A", "K-A-T", "C-A-T-T"],
      correctAnswer: "C-A-T"
    },
    Shapes: {
      question: "What shape is a ball?",
      options: ["Circle", "Square", "Triangle", "Rectangle"],
      correctAnswer: "Circle"
    },
    Colors: {
      question: "What color is the sky?",
      options: ["Blue", "Green", "Red", "Yellow"],
      correctAnswer: "Blue"
    }
  };

  const spinWheel = () => {
    if (!spinning) {
      setSpinning(true);
      const deg = Math.floor(Math.random() * 360) + 1440; // Faster & more rotations
      const wheel = document.getElementById("wheel");

      wheel.style.transition = "transform 1.5s cubic-bezier(0.25, 1, 0.5, 1)";
      wheel.style.transform = `rotate(${deg}deg)`;

      setTimeout(() => {
        const selectedCategory = categories[Math.floor(Math.random() * categories.length)];
        const question = questions[selectedCategory];
        onSpin(question);
        setSpinning(false);
      }, 1500); // Matches transition duration
    }
  };

  return (
    <div className="wheel-container">
      <div className="wheel" id="wheel"></div>
      <button className="spin-button" onClick={spinWheel} disabled={spinning}>
        Spin the Wheel 🎡
      </button>
    </div>
  );
};

export default SpinWheel;
