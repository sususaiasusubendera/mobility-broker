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

module.exports = {
  getServiceInfo,
};
