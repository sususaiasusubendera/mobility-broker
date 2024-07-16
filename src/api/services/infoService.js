const infoModel = require("../models/infoModel");
const CustomError = require("../utils/customError");

const getAllServiceInfo = async () => {
  try {
    const infoData = await infoModel.getAllServiceInfo();
    if (!infoData) {
      throw new CustomError("No service info found", 400);
    }

    return {
      service_info: infoData,
    };
  } catch (error) {
    if (!(error instanceof CustomError)) {
      error = new CustomError("Internal server error", 500);
    }
    throw error;
  }
};

module.exports = {
  getAllServiceInfo,
};
