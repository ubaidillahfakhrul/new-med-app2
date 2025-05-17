// server/routes/index.js
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "API is working!" });
});

// Ini akan menangani semua /api/auth/*
router.use("/auth", require("./auth"));

module.exports = router;
