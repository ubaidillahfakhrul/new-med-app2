const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connectToMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to Mongo Successfully");
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    process.exit(1);
  }
};

module.exports = connectToMongo;
