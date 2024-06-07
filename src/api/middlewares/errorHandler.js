const errorHandler = (err, req, res, next) => {
  const statusCode = err.status || 500;
  const message = err.message || "Internal Server Error";
  const details = err.details || [];

  if (process.env.NODE_ENV === "development") {
    console.error(err.stack);
  }

  if (details.length) {
    console.error("Detail:", details);
  }

  res.status(statusCode).json({
    status: "error",
    statusCode,
    message,
    ...(details.length && { details }),
  });
};

module.exports = errorHandler;
