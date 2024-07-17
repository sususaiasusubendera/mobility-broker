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

const getRouteInfoByProgram = async (program) => {
  try {
    // const infoData = await infoModel.getAllRouteInfo(program);
    // if (!infoData) {
    //   throw new CustomError("No route info found", 400);
    // }
    if (program == "tmp") {
      const infoData = await infoModel.getAllRouteInfoByProgram(
        "Trans Metro Pasundan"
      );
      if (!infoData) {
        throw new CustomError("No route info found", 400);
      }
      return {
        route_info: infoData,
      };
    } else if (program == "tmb") {
      const infoData = await infoModel.getAllRouteInfoByProgram(
        "Trans Metro Bandung"
      );
      if (!infoData) {
        throw new CustomError("No route info found", 400);
      }
      return {
        route_info: infoData,
      };
    } else if (program == "damri") {
      const infoData = await infoModel.getAllRouteInfoByProgram(
        "DAMRI Reguler"
      );
      if (!infoData) {
        throw new CustomError("No route info found", 400);
      }
      return {
        route_info: infoData,
      };
    } else {
      throw new CustomError("Program name unkwown", 400);
    }
  } catch (error) {
    if (!(error instanceof CustomError)) {
      error = new CustomError("Internal server error", 500);
    }
    throw error;
  }
};

const getMap = async () => {
  try {
    const data = await infoModel.getAllMap();
    if (!data) {
      throw new CustomError("No map found", 400);
    }

    return data;
  } catch (error) {
    if (!(error instanceof CustomError)) {
      error = new CustomError("Internal server error", 500);
    }
    throw error;
  }
};

module.exports = {
  getAllServiceInfo,
  getRouteInfoByProgram,
  getMap,
};
