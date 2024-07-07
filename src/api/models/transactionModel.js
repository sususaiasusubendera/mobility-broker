const pool = require("../configs/databaseConfig");

const createTransaction = async (data) => {
  const { user_id, trip_id, amount, transaction_date } = data; // no qr_link
  const query =
    "INSERT INTO transactions (user_id, trip_id, amount, transaction_date) VALUES ($1, $2, $3, $4) RETURNING *";
  const values = [user_id, trip_id, amount, transaction_date];
  const result = await pool.query(query, values);
  return result.rows[0];
};

const getTransactionById = async (id) => {
  const query = "SELECT * FROM transactions WHERE id = $1";
  const values = [id];
  const result = await pool.query(query, values);
  return result.rows[0];
};

const updateIsActiveToFalse = async (transaction_id, user_id) => {
  const query =
    "UPDATE transactions SET is_active = false WHERE transaction_id = $1 AND user_id = $2 RETURNING *";
  const values = [transaction_id, user_id];
  const result = await pool.query(query, values);
  return result.rows[0];
};

const getTransactionsTrue = async (user_id) => {
  const query =
    "SELECT * FROM transactions WHERE user_id = $1 AND is_active = true ORDER BY transaction_date DESC";
  const values = [user_id];
  const result = await pool.query(query, values);
  return result.rows;
};

const getTransactionsFalse = async (user_id) => {
  const query =
    "SELECT * FROM transactions WHERE user_id = $1 AND is_active = false ORDER BY transaction_date DESC";
  const values = [user_id];
  const result = await pool.query(query, values);
  return result.rows;
};

module.exports = {
  createTransaction,
  getTransactionById,
  updateIsActiveToFalse,
  getTransactionsTrue,
  getTransactionsFalse,
};
