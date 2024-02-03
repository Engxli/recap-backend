const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_LINK);
    console.log("CONNECTED TO DB!");
  } catch (error) {
    console.log("Could not connect to DB!", error);
  }
};

module.exports = connectDB;
