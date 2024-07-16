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

const getAllOriRec = async () => {
  try {
    const recData = await journeyModel.getAllOriRec();
    if (!recData) {
      throw new CustomError("No origin recommendation found", 400);
    }

    return {
      origin_recommendation: recData,
    };
  } catch (error) {
    if (!(error instanceof CustomError)) {
      error = new CustomError("Internal server error", 500);
    }
    throw error;
  }
};

const getAllDestRec = async () => {
  try {
    const recData = await journeyModel.getAllDestRec();
    if (!recData) {
      throw new CustomError("No destination recommendation found", 400);
    }

    return {
      destination_recommendation: recData,
    };
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
  getAllOriRec,
  getAllDestRec,
};
