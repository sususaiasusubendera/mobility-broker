const { hashPassword, comparePassword } = require("../utils/bcryptUtil");
const { generateToken } = require("../utils/jwtUtil");
const userModel = require("../models/userModel");
const CustomError = require("../utils/customError");

// CREATE USER
const createUser = async (userData) => {
  try {
    const { name, email, password } = userData;

    // check for existing email
    const existingUser = await userModel.getUserByEmail(email);
    if (existingUser) {
      throw new CustomError("Email already registered!", 409);
    }

    const hashedPassword = await hashPassword(password);
    const createdDate = new Date();

    return await userModel.createUser({
      name,
      email,
      password: hashedPassword,
      createdDate,
      balance: 1000000,
    });
  } catch (error) {
    if (!(error instanceof CustomError)) {
      error = new CustomError("Internal erver error", 500);
    }
    throw error;
  }
};

// LOGIN (need to be test)
const loginUser = async (email, password) => {
  try {
    const user = await userModel.getUserByEmail(email);
    if (!user) {
      throw new CustomErrorError("User not found", 404);
    }

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      throw new CustomError("Invalid password", 401);
    }

    const token = await generateToken(user);
    return { user, token };
  } catch (error) {
    if (!(error instanceof CustomError)) {
      error = new CustomError("Internal server error", 500);
    }
    throw error;
  }
};

module.exports = {
  createUser,
  loginUser,
};
