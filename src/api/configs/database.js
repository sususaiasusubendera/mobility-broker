const { Pool } = require("pg");

const path = require("path");
require("dotenv").config({
  path: path.resolve(__dirname, "../../../.env"),
});

const pool1 = new Pool({
  user: process.env.DATABASE1_USER,
  host: process.env.DATABASE1_HOST,
  database: process.env.DATABASE1_NAME,
  password: process.env.DATABASE1_PASS,
  port: process.env.DATABASE1_PORT,
});

const pool2 = new Pool({
  user: process.env.DATABASE2_USER,
  host: process.env.DATABASE2_HOST,
  database: process.env.DATABASE2_NAME,
  password: process.env.DATABASE2_PASS,
  port: process.env.DATABASE2_PORT,
});
