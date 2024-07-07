const transactionService = require("../services/transactionService");

const getTripSummary = async (req, res, next) => {
  const { startLat, startLon, endLat, endLon, time, date } = req.body;
  try {
    const tripSummary = await transactionService.planTrip(
      { lat: startLat, lon: startLon },
      { lat: endLat, lon: endLon },
      time,
      date
    );
    res.json(tripSummary);
  } catch (error) {
    next(error);
  }
};

const createTripTransaction = async (req, res, next) => {};

module.exports = {
  getTripSummary,
  createTripTransaction,
};
