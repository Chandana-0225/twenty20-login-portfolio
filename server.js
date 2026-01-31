const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

const UserSchema = new mongoose.Schema({
  email: String,
  password: String
});

const User = mongoose.model("User", UserSchema);

app.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    await User.create({ email, password });
    res.json({ message: "Registration successful" });
  } catch (error) {
    res.status(500).json({ error: "Registration failed" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    res.json({ success: !!user });
  } catch (error) {
    res.status(500).json({ success: false });
  }
});


const path = require("path");

// Root route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

module.exports = app; 
