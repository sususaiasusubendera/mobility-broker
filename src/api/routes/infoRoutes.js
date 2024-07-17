const express = require("express");
const infoController = require("../controllers/infoController");
const { authenticateToken } = require("../middlewares/auth");

const router = express.Router();

router.get("/service", infoController.getServiceInfo);
router.get("/route", infoController.getRouteInfoByProgram);
router.get("/transitmap", infoController.getMap);

module.exports = router;
