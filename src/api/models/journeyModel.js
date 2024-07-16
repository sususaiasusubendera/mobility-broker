const pool = require("../configs/databaseConfig");

// journey
const getJourneyById = async (id) => {
const query = "SELECT * FROM journey WHERE journey_id = $1";
  const values = [id];
  const result = await pool.query(query, values);
  return result.rows[0];
}

// origin recommendation
const getAllOriRec = async () => {
    const query = "SELECT * FROM origin_recommendation";
    const result = await pool.query(query);
    return result.rows;
}

// destination recommendation
const getAllDestRec = async () => {
    const query = "SELECT * FROM destination recommendation";
    const result = await pool.query(query);
    return result.rows;
}

module.exports = {
    getJourneyById,
    getAllOriRec,
    getAllDestRec
}