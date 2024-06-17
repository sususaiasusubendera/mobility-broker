const express = require("express");
const transactionController = require("../controllers/transactionController");
const { authenticateToken } = require("../middlewares/auth");

router.post("/plan", transactionController.getTripSummary);

module.exports = router