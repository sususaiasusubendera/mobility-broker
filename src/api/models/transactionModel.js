const pool = require("../configs/databaseConfig");

// create transaction
const createTransaction = async (data) => {
  const { user_id, trip_id, amount, transaction_date } = data; // no qr_link
  const query =
    "INSERT INTO transactions (user_id, trip_id, amount, transaction_date) VALUES ($1, $2, $3, $4) RETURNING *";
  const values = [user_id, trip_id, amount, transaction_date];
  const result = await pool.query(query, values);
  return result.rows[0];
};

// get transaction byy id
const getTransactionById = async (id) => {
  const query = "SELECT * FROM transactions WHERE transaction_id = $1";
  const values = [id];
  const result = await pool.query(query, values);
  return result.rows[0];
};

// change active ticket status
const updateIsActiveToFalse = async (transaction_id, user_id) => {
  const query =
    "UPDATE transactions SET is_active = false WHERE transaction_id = $1 AND user_id = $2 RETURNING *";
  const values = [transaction_id, user_id];
  const result = await pool.query(query, values);
  return result.rows[0];
};

// get active ticket
const getTransactionsTrue = async (user_id) => {
  const query =
    "SELECT * FROM transactions WHERE user_id = $1 AND is_active = true ORDER BY transaction_date DESC";
  const values = [user_id];
  const result = await pool.query(query, values);
  return result.rows;
};

// get ticket history
const getTransactionsFalse = async (user_id) => {
  const query =
    "SELECT * FROM transactions WHERE user_id = $1 AND is_active = false ORDER BY transaction_date DESC";
  const values = [user_id];
  const result = await pool.query(query, values);
  return result.rows;
};

// add information QR
const updateQR = async (qr_link, transaction_id) => {
  const query =
    "UPDATE transactions SET qr_link = $1 WHERE transaction_id = $2";
  const values = [qr_link, transaction_id];
  const result = await pool.query(query, values);
  return result.rows[0];
};

module.exports = {
  createTransaction,
  getTransactionById,
  updateIsActiveToFalse,
  getTransactionsTrue,
  getTransactionsFalse,
  updateQR,
};
