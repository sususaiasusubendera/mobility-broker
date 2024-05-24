const express = require("express");
require("dotenv").config();

const morgan = require("morgan");

const requestLogger = require("./api/middlewares/requestLogger");

// ---

const app = express();

app.use(requestLogger);
app.use(morgan("dev"));
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World!");
})

module.exports = app;
