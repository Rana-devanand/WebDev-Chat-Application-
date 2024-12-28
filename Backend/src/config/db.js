const mongoose = require("mongoose");
const { MONGO_DB_URL } = require("./dotenv");
const connect = async () => {
  try {
    await mongoose.connect(MONGO_DB_URL);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    process.exit(1);
  }
};

module.exports = connect;
