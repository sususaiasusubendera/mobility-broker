const otpService = require("./otpService");
const userModel = require("../models/userModel");
const transactionModel = require("../models/transactionModel");
const CustomError = require("../utils/customError");

const planTrip = async (fromPlace, toPlace, time, date) => {
  try {
    const tripSummaryData = await otpService.planTrip(
      `${fromPlace.lat},${fromPlace.lon}`,
      `${toPlace.lat},${toPlace.lon}`,
      time,
      date
    );

    return tripSummaryData;
  } catch (error) {
    if (!(error instanceof CustomError)) {
      error = new CustomError("Internal server error", 500);
    }
    throw error;
  }
};

const createTripTransactionInfo = async (email, trip_id) => {
  try {
    const user = await userModel.getUserByEmail(email);
    if (!user) {
      throw new CustomError("User not found", 404);
    }

    if (trip_id === "1") {
      const amount = 12000;
      if (user.balance < amount) {
        throw new CustomError("Not enough balance", 400);
      }
      const userNewBalance = await userModel.updateUserBalance(
        user.balance - amount,
        user.email
      );

      return await transactionModel.createTransaction({
        user_id: user.user_id,
        trip_id,
        amount,
        transaction_date: new Date(),
      });
    } else if (trip_id === "2") {
      const amount = 8000;
      if (user.balance < amount) {
        throw new CustomError("Not enough balance", 400);
      }
      const userNewBalance = await userModel.updateUserBalance(
        user.balance - amount,
        user.email
      );

      return await transactionModel.createTransaction({
        user_id: user.user_id,
        trip_id,
        amount,
        transaction_date: new Date(),
      });
    } else {
      throw new CustomError("Trip not found", 404);
    }
  } catch (error) {
    if (!(error instanceof CustomError)) {
      error = new CustomError("Internal server error", 500);
    }
    throw error;
  }
};

const changeTicketStatus = async (email, transaction_id) => {
  try {
    const user = await userModel.getUserByEmail(email);
    if (!user) {
      throw new CustomError("User not found", 404);
    }

    const transaction = await transactionModel.getTransactionById(
      Number(transaction_id)
    );
    if (user.user_id !== transaction.user_id) {
      throw new CustomError("User transaction not found", 404);
    }

    if (!transaction.is_active) {
      throw new CustomError("Ticket is not active", 400);
    }

    user_id = user.user_id;
    return await transactionModel.updateIsActiveToFalse(
      transaction_id,
      user_id
    );
  } catch (error) {
    if (!(error instanceof CustomError)) {
      error = new CustomError("Internal server error", 500);
    }
    throw error;
  }
};

const getTicketsTrueByEmail = async (email) => {
  try {
    const user = await userModel.getUserByEmail(email);
    if (!user) {
      throw new CustomError("User not found", 404);
    }

    const tickets = await transactionModel.getTransactionsTrue(user.user_id);
    return tickets;
  } catch (error) {
    if (!(error instanceof CustomError)) {
      error = new CustomError("Internal server error", 500);
    }
    throw error;
  }
};

const getTicketsFalseByEmail = async (email) => {
  try {
    const user = await userModel.getUserByEmail(email);
    if (!user) {
      throw new CustomError("User not found", 404);
    }

    const tickets = await transactionModel.getTransactionsFalse(user.user_id);
    return tickets;
  } catch (error) {
    if (!(error instanceof CustomError)) {
      error = new CustomError("Internal server error", 500);
    }
    throw error;
  }
};

module.exports = {
  planTrip,
  createTripTransactionInfo,
  changeTicketStatus,
  getTicketsTrueByEmail,
  getTicketsFalseByEmail,
};
