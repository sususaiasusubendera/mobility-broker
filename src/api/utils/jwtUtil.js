const jwt = require("jsonwebtoken");
require("dotenv").config();

// generateToken
const generateToken = (user) => {
  const secret = process.env.JWT_SECRET;
  const payload = {
    id: user.user_id,
    name: user.name,
  };

  const now = new Date();
  const expirationDate = new Date(now);
  expirationDate.setDate(now.getDate() + 7);
  expirationDate.setHours(0, 0, 0, 0); 

  const expiresIn = Math.floor((expirationDate - now) / 1000)

  return jwt.sign(payload, secret, { expiresIn });
};

// generateToken
const verifyToken = async (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = {
  generateToken,
  verifyToken,
};