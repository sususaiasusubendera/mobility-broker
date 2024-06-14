const otpService = require("./otpService");
const CustomError = require("../utils/customError");

const planTrip = async (fromPlace, toPlace, time, date) => {
  try {
    const tripSummaryData = await otpService.planTrip(
      fromPlace,
      toPlace,
      time,
      date
    );

    return tripSummaryData;
  } catch (error) {
    if (!(error instanceof CustomError)) {
      error = new CustomError("Internal erver error", 500);
    }
    throw error;
  }
};

module.exports = {
  planTrip,
};
