const express = require("express");
const infoController = require("../controllers/infoController");
const { authenticateToken } = require("../middlewares/auth");

const router = express.Router();

router.get("/service", infoController.getServiceInfo);

module.exports = router;
