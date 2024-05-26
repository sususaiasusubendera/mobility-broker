const { Pool } = require("pg");

// const path = require("path");
// require("dotenv").config({
//   path: path.resolve(__dirname, "../../../.env"),
// });
require("dotenv").config();

const pool = new Pool({
  user: process.env.DATABASE_USER,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASS,
  port: process.env.DATABASE_PORT,
});
