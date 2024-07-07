const pool = require("../configs/databaseConfig");

const createTransaction = async (data) => {
  const { user_id, trip_id, amount, transaction_date } = data; // no qr_link
  const query = "INSERT INTO transactions (user_id, trip_id, amount, transaction_date) VALUES ($1, $2, $3, $4) RETURNING *";
  const values = [user_id, trip_id, amount, transaction_date];
  const result = await pool.query(query, values);
};

const getTransactionById = async (id) => {
  const query = "SELECT * FROM transactions WHERE id = $1";
  const values = [id];
  const result = await pool.query(query, values);
  return result.rows[0];
};

module.exports = {
  createTransaction,
  getTransactionById,
};
