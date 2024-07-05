const jwt = require("jsonwebtoken");
// const accessSecret = require("./accessSecret");

// const generateToken = (user) => {
//   const payload = {
//     id: user.id,
//     name: user.name,
//   };
//   return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
// };

// const verifyToken = (token) => {
//   return jwt.verify(token, process.env.JWT_SECRET);
// };

// let jwtSecret;

// const getJwtSecret = async () => {
//   if (jwtSecret) {
//     return jwtSecret;
//   }

//   // check if it's in deployment environment
//   if (process.env.NODE_ENV === "deployment") {
//     try {
//       const secretName =
//         "projects/mobility-1234567/secrets/mobility-secret/versions/latest";
//       jwtSecret = await accessSecret(secretName);
//     } catch (err) {
//       console.error("Error accessing Secret Manager:", err);
//       throw new Error("Failed to get JWT secret from Secret Manager");
//     }
//   } else {
//     jwtSecret = process.env.JWT_SECRET;
//   }

//   if (!jwtSecret) {
//     throw new Error("JWT secret is not defined!");
//   }

//   return jwtSecret;
// };

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
