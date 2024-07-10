const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const requestLogger = require("./api/middlewares/requestLogger");
const errorHandler = require("./api/middlewares/errorHandler");
const userRoutes = require("./api/routes/userRoutes");
const transactionRoutes = require("./api/routes/transactionRoutes");
require("dotenv").config();

// ---

const app = express();

// middlewares
app.use(helmet()); // middleware for security related to HTTP header
app.use(morgan("dev")); // middleware for logging
app.use(requestLogger); // middleware for writing the log to a file
app.use(express.json()); // middleware for JSON parsing
app.use(express.urlencoded({ extended: true })); // middleware for URL-encoded payloads parsing

// ---

// routes for testing
app.get("/", (req, res, next) => {
  res.send("Welcome! You are using Bandung Transit API");
});

app.get("/api/health", (req, res, next) => {
  res.status(200).json({ status: "OK" });
});

// routes
app.use("/api/users", userRoutes);
app.use("/api/transactions", transactionRoutes);

// ---

app.use(errorHandler); // middleware for error handling

module.exports = app;
