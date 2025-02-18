import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import BadgesRewards from "../pages/BadgesRewards"; // Import BadgesRewards

const Dashboard = () => {
  const [students, setStudents] = useState([]);
  const socketRef = useRef(null); // Use ref to persist socket connection

  useEffect(() => {
    // Fetch leaderboard data
    axios.get("http://localhost:5000/leaderboard")
      .then((res) => {
        console.log("Fetched students:", res.data);
        setStudents(res.data);
      })
      .catch((err) => console.error("Error fetching students:", err));

    // Initialize WebSocket only once
    socketRef.current = io("http://localhost:5000");

    // Listen for live updates
    socketRef.current.on("update-students", (updatedStudents) => {
      console.log("Live update received:", updatedStudents);
      setStudents(updatedStudents);
    });

    return () => {
      socketRef.current.disconnect(); // Cleanup socket connection on unmount
    };
  }, []); // ✅ No missing dependency warning

  return (
    <div>
      <h1>📊 Students Leaderboard</h1>
      {students.length === 0 ? (
        <p>No student data available</p>
      ) : (
        <ul>
          {students.map((student) => (
            <li key={student.email}>
              {student.name} - {student.score}
            </li>
          ))}
        </ul>
      )}

      {/* 🎖️ Badges & Rewards Section */}
      <BadgesRewards />
    </div>
  );
};

export default Dashboard;
