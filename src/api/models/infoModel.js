const pool = require("../configs/databaseConfig");

// service_info
const getAllServiceInfo = async () => {
  const query = "SELECT * FROM service_info";
  const result = await pool.query(query);
  return result.rows;
};

// route_info
const getAllRouteInfoByProgram = async (program) => {
  const query = "SELECT * FROM route_info WHERE program = $1";
  values = [program];
  const result = await pool.query(query, values);
  return result.rows;
};

// transit_map
const getAllMap = async () => {
  const query = "SELECT * FROM transit_map";
  const result = await pool.query(query);
  return result.rows[0];
};

module.exports = {
  getAllRouteInfoByProgram,
  getAllServiceInfo,
  getAllMap,
};
