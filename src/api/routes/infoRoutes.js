const express = require("express");
const infoController = require("../controllers/infoController");
const { authenticateToken } = require("../middlewares/auth");

const router = express.Router();

// information service++
router.get("/service", authenticateToken, infoController.getServiceInfo);
router.get("/route", authenticateToken, infoController.getRouteInfoByProgram);
router.get("/transitmap", authenticateToken, infoController.getMap);

module.exports = router;
