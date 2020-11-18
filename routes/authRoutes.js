var express = require("express");
var router = express.Router();

const authController = require("../controllers/authController.js");

router.get("/initRoles", authController.initRoles);

module.exports = router;