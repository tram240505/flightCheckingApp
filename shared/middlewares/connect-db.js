const mongoose = require("mongoose");

const DB_URL = process.env.DB_URL;

async function connectDB(req, res, next) {
  try {
    await mongoose.connect(DB_URL, { dbName: "FlightCheckingApp" });
    console.log("Database Connected");
    next();
  } catch (error) {
    console.log(`Database connection failed`);
    console.log(error);
  }
}

module.exports = connectDB;
