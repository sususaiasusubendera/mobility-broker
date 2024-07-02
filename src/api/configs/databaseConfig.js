const { Pool } = require("pg");
const accessSecret = require("../utils/accessSecret");
const fs = require("fs");

require("dotenv").config();

const getConfig = async () => {
  let config = {};

  // check if .env exists
  if (fs.existsSync(".env")) {
    config = {
      DATABASE_USER: process.env.DATABASE_USER,
      DATABASE_HOST: process.env.DATABASE_HOST,
      DATABASE_NAME: process.env.DATABASE_NAME,
      DATABASE_PASS: process.env.DATABASE_PASS,
      DATABASE_PORT: process.env.DATABASE_PORT,
    };
  } else {
    try {
      const secretName = "projects/mobility-1234567/secrets/mobility-secret/versions/latest";
      config = await accessSecret(secretName);
    } catch (err) {
      console.log("Error accessing Secret Manager:", err);
      console.log("Falling back to environment variables (if any).");
      config = {
        DATABASE_USER: process.env.DATABASE_USER,
        DATABASE_HOST: process.env.DATABASE_HOST,
        DATABASE_NAME: process.env.DATABASE_NAME,
        DATABASE_PASS: process.env.DATABASE_PASS,
        DATABASE_PORT: process.env.DATABASE_PORT,
      };
    }
  }

  return config;
};

let pool;

// get configuration from secret manager or .env for database connection
const initializePool = async () => {
  const config = await getConfig();

  pool = new Pool({
    user: config.DATABASE_USER,
    host: config.DATABASE_HOST,
    database: config.DATABASE_NAME,
    password: config.DATABASE_PASS,
    port: config.DATABASE_PORT,
  });

  return pool;
};

// const pool = new Pool({
//   user: process.env.DATABASE_USER,
//   host: process.env.DATABASE_HOST,
//   database: process.env.DATABASE_NAME,
//   password: process.env.DATABASE_PASS,
//   port: process.env.DATABASE_PORT,
// });

module.exports = initializePool;
