const jwt = require("jsonwebtoken");
require("dotenv").config();

// generateToken
const generateToken = (user) => {
  const secret = process.env.JWT_SECRET;
  const payload = {
    id: user.user_id,
    name: user.name,
  };

  return jwt.sign(payload, secret, { expiresIn: 60 });
};

// generateToken
const verifyToken = async (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = {
  generateToken,
  verifyToken,
};
