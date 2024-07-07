const pool = require("../configs/databaseConfig");

const createUser = async (userData) => {
  const { name, email, password, createdDate, balance } = userData;
  const query =
    "INSERT INTO users (name, email, password, created_at, balance) VALUES ($1, $2, $3, $4, $5) RETURNING *";
  const values = [name, email, password, createdDate, balance];
  const result = await pool.query(query, values);
  return result.rows[0];
};

const getUserById = async (id) => {
  const query = "SELECT * FROM users WHERE id = $1";
  const values = [id];
  const result = await pool.query(query, values);
  return result.rows[0];
};

const getUserByName = async (name) => {
  const query = "SELECT * FROM users WHERE name = $1";
  const values = [name];
  const result = await pool.query(query, values);
  return result.rows[0];
};

const getUserByEmail = async (email) => {
  const query = "SELECT * FROM users WHERE email = $1";
  const values = [email];
  const result = await pool.query(query, values);
  return result.rows[0];
};

const updateUserBalance = async (newBalance, email) => {
  const query = "UPDATE users SET balance = $1 WHERE email = $2 RETURNING *";
  const values = [newBalance, email];
  const result = await pool.query(query, values);
  return result.rows[0];
};

module.exports = {
  createUser,
  getUserById,
  getUserByName,
  getUserByEmail,
  updateUserBalance,
};
