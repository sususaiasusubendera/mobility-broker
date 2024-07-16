const pool = require("../configs/databaseConfig");

// journey
const getAllJourney = async () => {
  const query = "SELECT * FROM journey";
  const result = await pool.query(query);
  return result.rows;
};

// origin recommendation
const getAllOriRec = async () => {
  const query = "SELECT * FROM origin_recommendation";
  const result = await pool.query(query);
  return result.rows;
};

// destination recommendation
const getAllDestRec = async () => {
  const query = "SELECT * FROM destination recommendation";
  const result = await pool.query(query);
  return result.rows;
};

module.exports = {
  getAllJourney,
  getAllOriRec,
  getAllDestRec,
};
