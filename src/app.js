const express = require("express");
const helmet = require("helmet");
require("dotenv").config();

const morgan = require("morgan");

const requestLogger = require("./api/middlewares/requestLogger");
const errorHandler = require("./api//middlewares/errorHandler");

// ---

const app = express();

app.use(helmet());
app.use(requestLogger);
app.use(morgan("dev"));
app.use(express.json());

// ---

// app.get("/", (req, res) => {
//     res.send("Hello World!");
//   });

app.get("/", (req, res, next) => {
  try {
    let hello = "hello";
    if (hello === "hello") {
      throw new Error("pass hello");
    }
  } catch (error) {
    next(error);
  }
});

// ---

app.use(errorHandler); // error handling middleware

module.exports = app;