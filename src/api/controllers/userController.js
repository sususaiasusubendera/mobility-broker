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
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

// login
const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const { user, token } = await userService.loginUser(email, password);
    res.status(200).json({ user, token });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  validateAndSanitizeUser,
  registerUser,
  loginUser,
};
