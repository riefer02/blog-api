require("dotenv").config({ path: "./.env" });

module.exports = {
  MONGODB_URI: process.env.MONGODB_URI,
  MONGODB_PASSWORD: process.env.MONGODB_PASSWORD,
  NODE_ENV: process.env.NODE_ENV,
  JWT_SECRET: process.env.JWT_SECRET,
};
