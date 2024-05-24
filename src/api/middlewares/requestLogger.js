const morgan = require("morgan");
const fs = require("fs");
const path = require("path");

// create a stream to record the log to a file
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "../../../logs" , "access.log"),
  { flags: "a" }
);

// morgan configuration to record the log to the console and a file
const requestLogger = morgan("combined", { stream: accessLogStream });

module.exports = requestLogger;
