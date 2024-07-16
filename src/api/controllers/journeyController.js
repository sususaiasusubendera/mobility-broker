const journeyService = require("../services/journeyService");
const CustomError = require("../utils/customError");

const showJourney = async (req, res, next) => {
  const origin = req.body.origin;
  const destination = req.body.destination;
  try {
    if (!origin || !destination) {
      res.json({
        journey: [],
      });
    }

    const journey = await journeyService.showJourney(origin, destination);
    res.status(200).json(journey);
  } catch (error) {
    next(error);
  }
};

const getJourney = async (req, res, next) => {
  const id = req.query.id;
  try {
    if (!id) {
      return next(new CustomError("Bad request", 400));
    }

    const journey = await journeyService.getJourneyById(id);
    res.status(200).json(journey);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  showJourney,
  getJourney,
};
