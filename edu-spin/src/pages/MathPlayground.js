import React, { useState } from "react";
import "./../styles/MathPlayground.css";

const generateRandomNumber = (max) => Math.floor(Math.random() * max) + 1;
const operations = ["+", "-", "*", "/"];

const MathPlayground = () => {
  const [num1, setNum1] = useState(generateRandomNumber(10));
  const [num2, setNum2] = useState(generateRandomNumber(10));
  const [operation, setOperation] = useState("+");
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0);

  const calculateAnswer = () => {
    switch (operation) {
      case "+": return num1 + num2;
      case "-": return num1 - num2;
      case "*": return num1 * num2;
      case "/": return (num1 / num2).toFixed(2); // Limit division to 2 decimal places
      default: return 0;
    }
  };

  const checkAnswer = () => {
    if (parseFloat(userAnswer) === parseFloat(calculateAnswer())) {
      setFeedback("🎉 Correct! Well done!");
      setScore(score + 1);
    } else {
      setFeedback("❌ Oops! Try again.");
    }
  };

  const generateNewQuestion = () => {
    setNum1(generateRandomNumber(10));
    setNum2(generateRandomNumber(10));
    setOperation(operations[Math.floor(Math.random() * operations.length)]);
    setUserAnswer("");
    setFeedback("");
  };

  return (
    <div className="math-container">
      <h1>Math Playground</h1>
      <p>Score: {score}</p>
      <p>Solve the problem below:</p>
      <h2>{num1} {operation} {num2} = ?</h2>
      <input
        type="number"
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
        placeholder="Your Answer"
      />
      <div className="buttons">
        <button onClick={checkAnswer}>Check Answer</button>
        <button onClick={generateNewQuestion}>New Question</button>
      </div>
      <p className="feedback">{feedback}</p>
    </div>
  );
};

export default MathPlayground;
