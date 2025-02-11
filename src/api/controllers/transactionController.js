const transactionService = require("../services/transactionService");
const CustomError = require("../utils/customError");

// OTP
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

const createTripTransaction = async (req, res, next) => {
  const email = req.query.email;
  const trip_id = req.query.trip_id;
  try {
    if (!email) {
      return next(new CustomError("Bad request", 400));
    }

    if (!trip_id) {
      return next(new CustomError("Bad request", 400));
    }

    const newTripTransaction =
      await transactionService.createTripTransactionInfo(email, trip_id);
    res.status(201).json(newTripTransaction);
  } catch (error) {
    next(error);
  }
};

const changeTicketStatus = async (req, res, next) => {
  const email = req.query.email;
  const transaction_id = req.query.transaction_id;
  try {
    if (!email) {
      return next(new CustomError("Bad request", 400));
    }

    if (!transaction_id) {
      return next(new CustomError("Bad request", 400));
    }

    const newStatus = await transactionService.changeTicketStatus(
      email,
      transaction_id
    );
    res.status(200).json(newStatus);
  } catch (error) {
    next(error);
  }
};

const getTickets = async (req, res, next) => {
  const email = req.query.email;
  try {
    if (!email) {
      return next(new CustomError("Bad request", 400));
    }

    const tickets = await transactionService.getTicketsTrueByEmail(email);
    res.status(200).json(tickets);
  } catch (error) {
    next(error);
  }
};

const getTicketsHistory = async (req, res, next) => {
  const email = req.query.email;
  try {
    if (!email) {
      return next(new CustomError("Bad request", 400));
    }

    const tickets = await transactionService.getTicketsFalseByEmail(email);
    res.status(200).json(tickets);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTripSummary,
  createTripTransaction,
  changeTicketStatus,
  getTickets,
  getTicketsHistory,
};
