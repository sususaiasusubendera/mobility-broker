const express = require("express");
const journeyController = require("../controllers/journeyController");
const { authenticateToken } = require("../middlewares/auth");

const router = express.Router();

router.post("/", journeyController.showJourney);
router.get("/journey", journeyController.getJourney);
router.get("/recommendation/origin", journeyController.showOriRec);
router.get("/recommendation/destination", journeyController.showDestRec);

module.exports = router;
