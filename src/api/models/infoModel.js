const pool = require("../configs/databaseConfig");

// route_info
const getRouteByProgram = async (program) => {
  const query = "SELECT * FROM route_info WHERE program = $1";
  const values = [program];
  const result = await pool.query(query, values);
  return result.rows[0];
};

// service_info
const getAllServiceInfo = async () => {
  const query = "SELECT * FROM service_info";
  const result = await pool.query(query);
  return result.rows;
};

module.exports = {
  getRouteByProgram,
  getAllServiceInfo,
};
