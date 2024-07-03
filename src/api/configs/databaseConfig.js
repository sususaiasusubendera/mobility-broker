const { Pool } = require("pg");
const accessSecret = require("../utils/accessSecret");

require("dotenv").config();

const getConfig = async () => {
  if (process.env.NODE_ENV === "deployment") {
    try {
      const secretName =
        "projects/mobility-1234567/secrets/mobility-secret/versions/latest";
      return await accessSecret(secretName);
    } catch (err) {
      console.error("Error accessing Secret Manager:", err);
      return {
        DATABASE_USER: process.env.DATABASE_USER,
        DATABASE_HOST: process.env.DATABASE_HOST,
        DATABASE_NAME: process.env.DATABASE_NAME,
        DATABASE_PASS: process.env.DATABASE_PASS,
        DATABASE_PORT: process.env.DATABASE_PORT,
      };
    }
  } else {
    return {
      DATABASE_USER: process.env.DATABASE_USER,
      DATABASE_HOST: process.env.DATABASE_HOST,
      DATABASE_NAME: process.env.DATABASE_NAME,
      DATABASE_PASS: process.env.DATABASE_PASS,
      DATABASE_PORT: process.env.DATABASE_PORT,
    };
  }
};

let pool;

// get configuration from secret manager or .env for database connection
const initializePool = async () => {
  if (!pool) {
    const config = await getConfig();

    pool = new Pool({
      user: config.DATABASE_USER,
      host: config.DATABASE_HOST,
      database: config.DATABASE_NAME,
      password: config.DATABASE_PASS,
      port: config.DATABASE_PORT,
    });
  }

  return pool;
};

module.exports = initializePool;
