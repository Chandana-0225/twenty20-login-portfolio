const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// ✅ SERVE STATIC FILES FIRST
app.use(express.static(path.join(__dirname, "public")));

// DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// SCHEMA
const UserSchema = new mongoose.Schema({
  email: String,
  password: String
});

const User = mongoose.model("User", UserSchema);

// API ROUTES
app.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    await User.create({ email, password });
    res.json({ message: "Registration successful" });
  } catch (err) {
    res.status(500).json({ message: "Registration failed" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  res.json({ success: !!user });
});

// ✅ HTML FALLBACK MUST BE LAST
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// EXPORT FOR VERCEL
module.exports = app;

