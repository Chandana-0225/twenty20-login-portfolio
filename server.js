const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dontenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post("/register", (req, res) => {
  res.json({ message: "Registration successful (demo)" });
});

app.post("/login", (req, res) => {
  res.json({ success: true });
});

module.exports = app;


