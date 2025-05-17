const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const app = express();
const cors = require('cors');

app.use(cors({
  origin: 'https://new-med-app.onrender.com',  // alamat frontend kamu
  credentials: true, // kalau perlu kirim cookie/session
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// route register
app.post('/api/auth/register', (req, res) => {
  // proses registrasi user dan simpan ke MongoDB
  res.json({ message: 'Register success' });
});

app.listen(process.env.PORT || 10000, () => {
  console.log('Server running...');
});

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
    secret: process.env.SESSION_SECRET || 'secretdefault', // ganti dengan environment variable untuk security
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

console.log('MongoDB URI:', process.env.MONGODB_URI); // sementara untuk debug
mongoose.set('strictQuery', true); // atau false sesuai kebutuhan

// Routes
app.use("/api", require("./routes/api")); // contoh penggunaan route

// Jalankan server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


