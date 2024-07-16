const journeyService = require("../services/journeyService");
const CustomError = require("../utils/customError");

const showJourney = async (req, res, next) => {
  const origin = req.body.origin;
  const destination = req.body.destination;
  try {
    if (!origin || !destination) {
      return next(new CustomError("Bad request", 400));
    }

    const journey = await journeyService.showJourney(origin, destination);
    res.status(200).json(journey);
    return;
  } catch (error) {
    next(error);
  }
};

module.exports = {
  showJourney,
};
