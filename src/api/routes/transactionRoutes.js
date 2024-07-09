const express = require("express");
const transactionController = require("../controllers/transactionController");
const { authenticateToken } = require("../middlewares/auth");

const router = express.Router();

// plan trip using OTP
router.post("/plan", authenticateToken, transactionController.getTripSummary);
router.post("/transaction", authenticateToken, transactionController.createTripTransaction);
router.post("/ticket/status", authenticateToken, transactionController.changeTicketStatus);
router.get("/tickets", authenticateToken, transactionController.getTickets);
router.get("/tickets/history", authenticateToken, transactionController.getTicketsHistory);

module.exports = router;
