import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom"; // ✅ Add redirection for missing users
import "./../styles/Game.css";
import SpinWheel from "../components/SpinWheel";

const Game = () => {
  const [showQuestion, setShowQuestion] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [userAnswer, setUserAnswer] = useState(null);
  const [feedback, setFeedback] = useState(""); 
  const [spinKey, setSpinKey] = useState(0);
  const [score, setScore] = useState(0);
  const [userDetails, setUserDetails] = useState({ name: "", email: "" });

  const socketRef = useRef(null);
  const navigate = useNavigate(); // ✅ Hook for redirection

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch("http://localhost:5000/students");
        const students = await response.json();
        const storedEmail = localStorage.getItem("email");
  
        const user = students.find(student => student.email === storedEmail);
        if (!user) {
          console.error("User not logged in. Redirecting...");
          alert("You must log in first!");
          navigate("/login");
        } else {
          setUserDetails(user);
        }
      } catch (error) {
        console.error("Failed to fetch user details:", error);
      }
    };
  
    fetchUserDetails();
    
    socketRef.current = io("http://localhost:5000");
    return () => socketRef.current.disconnect();
  }, [navigate]);
  
  const handleSpinResult = (question) => {
    setCurrentQuestion(question);
    setShowQuestion(true);
    setUserAnswer(null); 
    setFeedback(""); 
    setSpinKey((prevKey) => prevKey + 1);
  };

  const handleAnswerClick = (answer) => {
    setUserAnswer(answer);
    if (answer === currentQuestion.correctAnswer) {
      setFeedback("Correct! 🎉");
      setScore((prevScore) => {
        const newScore = prevScore + 10;
        submitScore(newScore); // ✅ Ensure correct score is submitted
        return newScore;
      });
    } else {
      setFeedback("Wrong answer. Try again! 😕");
    }
  };
  
  // ✅ Submit score only if user details exist
  const submitScore = async (newScore) => {
    if (!userDetails.email) {
      console.error("User details missing, cannot submit score.");
      return;
    }
  
    const updatedUser = { ...userDetails, score: newScore };
  
    try {
      await fetch("http://localhost:5000/update-score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUser),
      });
      console.log("Score updated successfully:", updatedUser);
    } catch (error) {
      console.error("Error updating score:", error);
    }
  };
  

  return (
    <div className="game-container">
      <h1 className="game-title">Spin & Learn</h1>
      <p className="score-display">Your Score: {score}</p>
      <div className="game-content">
        <div className="spin-wheel-container">
          <SpinWheel key={spinKey} onSpin={handleSpinResult} />
        </div>
        <div className="question-container">
          {showQuestion && currentQuestion && (
            <div className="question-box">
              <h2>{currentQuestion.question}</h2>
              <ul>
                {currentQuestion.options.map((option, index) => (
                  <li
                    key={index}
                    className={userAnswer === option ? "selected" : ""}
                    onClick={() => handleAnswerClick(option)}
                  >
                    {option}
                  </li>
                ))}
              </ul>
              <div className={`feedback ${feedback === "Correct! 🎉" ? "correct" : "wrong"}`}>
                {feedback}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Game;
