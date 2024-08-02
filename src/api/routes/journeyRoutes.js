const express = require("express");
const journeyController = require("../controllers/journeyController");
const { authenticateToken } = require("../middlewares/auth");

const router = express.Router();

// journey information++
router.post("/", authenticateToken, journeyController.showJourney);
router.get("/journey", authenticateToken, journeyController.getJourney);
router.get("/recommendation/origin", authenticateToken, journeyController.showOriRec);
router.get("/recommendation/destination", authenticateToken, journeyController.showDestRec);

module.exports = router;
