const { verifyToken } = require("../utils/jwtUtil");

// authenticate token for protected routes
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Access denied!",
    });
  }

  try {
    const user = verifyToken(token);
    req.user = user;
    next();
  } catch (error) {
    res.status(403).json({
      message: "invalid token!",
    });
  }
};

module.exports = { authenticateToken };
