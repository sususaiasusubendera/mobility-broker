const express = require("express");
const userController = require("../controllers/userController");
const { authenticateToken } = require("../middlewares/auth");

const router = express.Router();

// register and login
router.post("/register", userController.validateAndSanitizeUser, userController.registerUser);
router.post("/login", userController.loginUser);
router.get("/user/session", userController.checkSession);
router.get("/user", authenticateToken, userController.getUserDataByEmail);

// auth protected route (for authentication test purpose)
router.get("/test", authenticateToken, (req, res) => {
  res.send("This is a protected route.");
});

module.exports = router;
