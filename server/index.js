const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const cors = require("cors");

const app = express();
const routes = require("./routes"); // Pastikan path-nya benar

app.use(
  cors({
    origin: "https://new-med-app.onrender.com",
    credentials: true,
  })
);

app.use(express.json());
app.use("/api", routes); // Ini otomatis meng-handle semua /api/auth/*
app.use(express.urlencoded({ extended: true }));

// Session middleware (letakkan sebelum routes)
app.use(
  session({
    secret: process.env.SESSION_SECRET || "secretdefault",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
      collectionName: "sessions",
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

// Koneksi MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.once("open", () => {
  console.log("MongoDB connected");
});

mongoose.set("strictQuery", true);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
