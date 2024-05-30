const { hashPassword, comparePassword } = require("../utils/bcryptUtil");
const { generateToken } = require("../utils/jwtUtil");
const userModel = require("../models/userModel");

const createUser = async (userData) => {
  const { name, email, password } = userData;

  const hashedPassword = await hashPassword(password);

  return await userModel.createUser({
    name,
    email,
    password: hashedPassword,
  });
};

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
