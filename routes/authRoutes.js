var express = require("express");
var router = express.Router();

const authController = require("../controllers/authController.js");
const { verifySignUp, setResponseHeaders } = require("../middleware");

router.post("/initRoles", authController.initRoles); // Initialize Roles in DB Collection

router.post(
  "/signup",
  [
    setResponseHeaders,
    verifySignUp.checkDuplicateUsernameOrEmail,
    verifySignUp.checkRolesExisted,
  ],
  authController.signUp
);

router.post("/login", authController.login);

module.exports = router;
