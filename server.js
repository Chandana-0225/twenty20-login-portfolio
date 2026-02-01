const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

// ✅ serve static files correctly
app.use(express.static(path.join(__dirname, "public")));

// ✅ home route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// ✅ register API (always JSON)
app.post("/register", (req, res) => {
  return res.json({ message: "Registration successful (demo)" });
});

// ✅ login API (always JSON)
app.post("/login", (req, res) => {
  return res.json({ success: true });
});

// ❗ IMPORTANT for Vercel
module.exports = app;



