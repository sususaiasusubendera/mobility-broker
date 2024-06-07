const express = require("express");
const userController = require("../controllers/userController");
const { authenticateToken } = require("../middlewares/auth");

const router = express.Router();

// register and login
router.post("/register", userController.validateAndSanitizeUser ,userController.registerUser);
router.post("/login", userController.loginUser);

// auth protected route
// router.get('/profile', authenticateToken, (req, res) => {
//     res.send('This is a protected route.');
// });

module.exports = router;
