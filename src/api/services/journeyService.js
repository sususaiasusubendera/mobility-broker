const journeyModel = require("../models/journeyModel");
const CustomError = require("../utils/customError");

const showJourney = async (origin, destination) => {
  try {
    if (
      origin.toLowerCase() !== "terminal cicaheum".toLowerCase() ||
      destination.toLowerCase() !== "terminal elang".toLowerCase()
    ) {
      return {
        journey: [],
      };
    } else if (
      origin.toLowerCase() === "terminal cicaheum".toLowerCase() &&
      destination.toLowerCase() === "terminal elang".toLowerCase()
    ) {
      return {
        journey: await journeyModel.getAllJourney(),
      };
    }
    // return await journeyModel.getAllJourney();
  } catch (error) {
    if (!(error instanceof CustomError)) {
      error = new CustomError("Internal server error", 500);
    }
    throw error;
  }
};

const getJourneyById = async (id) => {
  try {
    const journey = await journeyModel.getJourneyById(id);
    if (!journey) {
      throw new CustomError("Journey not found", 404);
    }

    return journey;
  } catch (error) {
    if (!(error instanceof CustomError)) {
      error = new CustomError("Internal server error", 500);
    }
    throw error;
  }
};

module.exports = {
  showJourney,
  getJourneyById,
};
