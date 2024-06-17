const express = require("express");
const transactionController = require("../controllers/transactionController");
const { authenticateToken } = require("../middlewares/auth");

const router = express.Router();

router.post("/plan", transactionController.getTripSummary);

module.exports = router;