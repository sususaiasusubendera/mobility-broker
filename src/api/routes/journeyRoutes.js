const express = require("express");
const journeyController = require("../controllers/journeyController");
const { authenticateToken } = require("../middlewares/auth");

const router = express.Router();

router.get("/", journeyController.showJourney);
router.get("/journey", journeyController.getJourney);

module.exports = router;
