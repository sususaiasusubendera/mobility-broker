const { hashPassword, comparePassword } = require("../utils/bcryptUtil");
const { generateToken } = require("../utils/jwtUtil");
const userModel = require("../models/userModel");

// CREATE USER
const createUser = async (userData) => {
  const { name, email, password } = userData;

  // check for existing email
  const existingUser = await userModel.getUserByEmail(email);
  if (existingUser) {
    const error =  new Error("Email already registered!");
    error.status = 409;
    throw error;
  }

  const hashedPassword = await hashPassword(password);
  const createdDate = new Date();

  return await userModel.createUser({
    name,
    email,
    password: hashedPassword,
    createdDate,
  });
};

// LOGIN
const loginUser = async (email, password) => {
  const user = await userModel.getUserByEmail(email);
  if (!user) {
    throw new Error("User not found");
  }

  const isPasswordValid = await comparePassword(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }

  const token = generateToken(user);
  return { user, token };
};

module.exports = {
  createUser,
  loginUser,
};
