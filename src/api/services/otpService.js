const axios = require("axios");

// PLAN TRIP
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
      const error = new Error("Failed to plan trip");
      error.status = 400;
      throw error;
    }
  } catch (error) {
    console.error("Error planning trip: ", error.message);
    throw error;
  }
};

module.exports = {
  planTrip,
};
