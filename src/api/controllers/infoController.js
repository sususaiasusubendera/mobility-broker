const infoService = require("../services/infoService");
const CustomError = require("../utils/customError");

const getServiceInfo = async (req, res, next) => {
  try {
    const info = await infoService.getAllServiceInfo();
    res.status(200).json(info);
  } catch (error) {
    next(error);
  }
};

const getRouteInfoByProgram = async (req, res, next) => {
  const program = req.query.program;
  try {
    if (!program) {
      return next(new CustomError("Bad request", 400));
    }

    const info = await infoService.getRouteInfoByProgram(program);
    res.status(200).json(info);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getServiceInfo,
  getRouteInfoByProgram,
};
