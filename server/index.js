const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Koneksi MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.once("open", () => {
  console.log("MongoDB connected");
});

// SESSION Middleware (letakkan di sini)
app.use(
  session({
    secret: "your-secret", // ganti dengan environment variable untuk security
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
      collectionName: "sessions",
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 hari
    },
  })
);

// Routes
app.use("/api", require("./routes/api")); // contoh penggunaan route

// Jalankan server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
