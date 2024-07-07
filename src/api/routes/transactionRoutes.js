const express = require("express");
const transactionController = require("../controllers/transactionController");
const { authenticateToken } = require("../middlewares/auth");

const router = express.Router();

// plan trip using OTP
router.post("/plan", transactionController.getTripSummary);
router.post("/trip", transactionController.createTripTransaction);

module.exports = router;
