const axios = require("axios");
const CustomError = require("../utils/customError");

// PLAN TRIP (not used)
// fromPlace: "latitude,longitude"
// toPlace: "latitude,longitude"
const planTrip = async (fromPlace, toPlace, time, date) => {
  try {
    const response = await axios.get(
      "http://localhost:8080/otp/routers/default/plan",
      {
        params: {
          fromPlace,
          toPlace,
          time,
          date,
          mode: "TRANSIT,WALK",
          arriveBy: false,
          wheelChair: false,
        },
      }
    );

    if (response.status === 200) {
      return response.data;
    } else {
      throw new CustomError("Failed to plan trip", 400);
    }
  } catch (error) {
    if (!(error instanceof CustomError)) {
      error = new CustomError("Internal server error", 500);
    }
    throw error;
  }
};

module.exports = {
  planTrip,
};
