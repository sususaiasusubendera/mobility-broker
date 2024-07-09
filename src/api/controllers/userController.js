const { body, validationResult } = require("express-validator");
const userService = require("../services/userService");
const CustomError = require("../utils/customError");

// middleware for validation and sanitization
const validateAndSanitizeUser = [
  body("name").trim().isLength({ min: 3 }).escape(),
  body("email").isEmail().normalizeEmail(),
  body("password").isLength({ min: 6 }).escape(),

  (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return next(new CustomError("Validation failed", 400, error.array()));
    }
    next();
  },
];

// register
const registerUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const newUser = await userService.createUser({ name, email, password });
    res
      .status(201)
      .json({ message: "Account created. Hello, " + newUser.name });
  } catch (error) {
    next(error);
  }
};

// login
const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const { user, token } = await userService.loginUser(email, password);
    res.status(200).json({ email: user.email, token });
  } catch (error) {
    next(error);
  }
};

// get user data by email
const getUserDataByEmail = async (req, res, next) => {
  if (req.query.email) {
    const email = req.query.email;
    try {
      const user = await userService.getUserDataByEmail(email);
      if (!user) {
        return next(new CustomError("User not found", 404));
      }
      res.status(200).json({
        user_id: user.user_id,
        name: user.name,
        email: user.email,
        balance: user.balance,
      });
    } catch (error) {
      next(error);
    }
  }
};

// check session
const checkSession = async (req, res, next) => {};

module.exports = {
  validateAndSanitizeUser,
  registerUser,
  loginUser,
  getUserDataByEmail,
  checkSession,
};
