import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Game from "./pages/Game";
import DrawLearn from "./pages/DrawLearn";
import PuzzleMatch from "./pages/PuzzleMatch";
import MathPlayground from "./pages/MathPlayground";
import StoryMode from "./pages/StoryMode";
import VideoLearning from "./pages/VideoLearning";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Navbar from "./pages/Navbar"; // Import Navbar
import "./App.css";

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const [showNavbar, setShowNavbar] = useState(false);
  const location = useLocation();
  const isLoggedIn = localStorage.getItem("loggedIn");

  useEffect(() => {
    setShowNavbar(
      location.pathname !== "/login" && location.pathname !== "/register"
    );
  }, [location]);

  return (
    <>
      {showNavbar && <Navbar setShowNavbar={setShowNavbar} />} {/* Pass setShowNavbar */}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Private Routes */}
        <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/game" element={isLoggedIn ? <Game /> : <Navigate to="/login" />} />
        <Route path="/draw-learn" element={isLoggedIn ? <DrawLearn /> : <Navigate to="/login" />} />
        <Route path="/puzzle-match" element={isLoggedIn ? <PuzzleMatch /> : <Navigate to="/login" />} />
        <Route path="/math-playground" element={isLoggedIn ? <MathPlayground /> : <Navigate to="/login" />} />
        <Route path="/story-mode" element={isLoggedIn ? <StoryMode /> : <Navigate to="/login" />} />
        <Route path="/video-learning" element={isLoggedIn ? <VideoLearning /> : <Navigate to="/login" />} />
      </Routes>
    </>
  );
}

export default App;
