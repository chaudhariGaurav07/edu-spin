const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const Datastore = require("nedb");

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

// Initialize NeDB databases
const studentsDb = new Datastore({ filename: "students.db", autoload: true });
const usersDb = new Datastore({ filename: "users.db", autoload: true }); // Users database

io.on("connection", (socket) => {
  console.log("New player connected:", socket.id);

  socket.on("submit-score", (data) => {
    console.log("Score received:", data);

    studentsDb.findOne({ email: data.email }, (err, existingStudent) => {
      if (err) {
        console.error("Database error:", err);
        return;
      }

      if (existingStudent) {
        studentsDb.update({ email: data.email }, { $set: { score: data.score } }, {}, () => {
          console.log("Updated student score:", data);
          sendUpdatedLeaderboard();
        });
      } else {
        studentsDb.insert({ name: data.name, email: data.email, score: data.score }, () => {
          console.log("Added new student:", data);
          sendUpdatedLeaderboard();
        });
      }
    });
  });

  socket.on("disconnect", () => {
    console.log("Player disconnected:", socket.id);
  });
});

// Helper function to send updated leaderboard data
const sendUpdatedLeaderboard = () => {
  studentsDb.find({}).sort({ score: -1 }).exec((err, students) => {
    if (err) {
      console.error("Error fetching students:", err);
      return;
    }
    io.emit("update-students", students);
  });
};

// Endpoint to fetch leaderboard data
app.get("/leaderboard", (req, res) => {
  studentsDb.find({}).sort({ score: -1 }).exec((err, students) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Database error" });
    }
    console.log("Fetched students for leaderboard:", students);
    res.json(students);
  });
});

// Register a new user
app.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  // Check if the user already exists
  usersDb.findOne({ email }, (err, existingUser) => {
    if (err) return res.status(500).json({ error: "Database error" });

    if (existingUser) {
      return res.status(400).json({ message: "User already registered" });
    }

    // Insert new user into the database
    usersDb.insert({ name, email, password }, (err) => {
      if (err) return res.status(500).json({ error: "Failed to register user" });
      res.status(201).json({ message: "User registered successfully!" });
    });
  });
});
//login route
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  usersDb.findOne({ email }, (err, user) => {
    if (err) {
      return res.status(500).json({ message: "Database error" });
    }

    if (!user || user.password !== password) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    res.json({ name: user.name, email: user.email, message: "Login successful!" });
  });
});

// Start the server
const PORT = 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
