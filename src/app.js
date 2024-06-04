const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const requestLogger = require("./api/middlewares/requestLogger");
const errorHandler = require("./api//middlewares/errorHandler");
const userRoutes = require("./api/routes/userRoutes");
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

app.get("/", (req, res, next) => {
  // try { // testing for errorHandler
  //   let hello = "hello";
  //   if (hello === "hello") {
  //     throw new Error("pass hello");
  //   }
  // } catch (error) {
  //   next(error);
  // }
  res.send("Hello World!");
});

// ---

// routes
app.use("/api/users", userRoutes);

// ---

app.use(errorHandler); // middleware for error handling

module.exports = app;
