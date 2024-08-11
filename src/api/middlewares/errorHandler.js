const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  const details = err.details || [];

  // environment checker
  if (process.env.NODE_ENV === "development") {
    console.error(err.stack);
  }

  console.error(err.stack);
  console.error

  if (details.length) {
    console.error("Details:", details);
  }

  res.status(statusCode).json({
    status: "error",
    statusCode,
    message,
    ...(details.length && { details }),
  });
};

module.exports = errorHandler;
