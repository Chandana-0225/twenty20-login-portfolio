const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

// ✅ VERY IMPORTANT
app.use(express.static(path.join(__dirname, "public")));

// Home
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Register (demo)
app.post("/register", (req, res) => {
  res.json({ message: "Registration successful" });
});

// Login (demo)
app.post("/login", (req, res) => {
  res.json({ success: true });
});

module.exports = app;





