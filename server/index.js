const express = require("express");
const cors = require("cors");
const http = require("http");
const connectToMongo = require("./db");
const app = express();
const path = require("path");

app.set("view engine", "ejs");
app.use(express.static("public"));

const PORT = process.env.PORT || 8181;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", require("./routes/auth"));
// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

// Serve static React files
app.use(express.static(path.join(__dirname, "build")));
// Catch-all route (for React Router)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// Connect to MongoDB first, then start server
connectToMongo()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Server is running on port http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect to MongoDB:", err);
  });
