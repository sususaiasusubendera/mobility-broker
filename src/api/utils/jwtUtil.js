const jwt = require("jsonwebtoken");

// generateToken
const generateToken = (user) => {
  const secret = process.env.JWT_SECRET;
  const payload = {
    id: user.id,
    name: user.name,
  };

  return jwt.sign(payload, secret, { expiresIn: "1h" });
};

// generateToken
const verifyToken = async (token) => {
  const secret = await getJwtSecret();
  return jwt.verify(token, secret);
};

module.exports = {
  generateToken,
  verifyToken,
};
