const express = require("express");
const cors = require("cors");
const connectToMongo = require("./db");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 8181;

// Middleware
app.use(express.json());
app.use(cors());

// Routes (API)
app.use("/api/auth", require("./routes/auth"));
// Serve static React build files
app.use(express.static(path.join(__dirname, "build")));

// React client entry point
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// Start server after MongoDB connected
connectToMongo()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect to MongoDB:", err);
  });
