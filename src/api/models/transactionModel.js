const initializePool = require("../configs/databaseConfig");

const getTransactionById = async (id) => {
  const pool = await initializePool();
  const query = "SELECT * FROM transactions WHERE id = $1";
  const values = [id];
  const result = await pool.query(query, values);
  return result.rows[0];
};

module.exports = {
  getTransactionById,
};
