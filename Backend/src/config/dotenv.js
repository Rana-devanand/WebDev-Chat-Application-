const dotenv = require("dotenv");
const bcrypt = require("bcrypt");

dotenv.config();

module.exports = {
  PORT: process.env.PORT,
  MONGO_DB_URL: process.env.MONGO_DB_URL,
  JWT_KEY: process.env.JWT_KEY,
  SALT : bcrypt.genSaltSync(10)
};
