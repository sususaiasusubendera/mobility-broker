const pool = require("../configs/databaseConfig");

const createUser = async (userData) => {
  const { name, email, password, createdDate } = userData;
  const query = "INSERT INTO users (name, email, password, created_at) VALUES ($1, $2, $3, $4) RETURNING *";
  const values = [name, email, password, createdDate];
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

module.exports = {
  createUser,
  getUserById,
  getUserByName,
  getUserByEmail,
};
