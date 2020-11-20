var express = require("express");
var router = express.Router();

const authController = require("../controllers/authController.js");
const { verifySignUp, setResponseHeaders } = require("../middleware");

router.get("/initRoles", authController.initRoles); // Initialize Roles in DB Collection

router.post(
  "/signup",
  [
    setResponseHeaders,
    verifySignUp.checkDuplicateUsernameOrEmail,
    verifySignUp.checkRolesExisted,
  ],
  authController.signUp
);

router.post("/signin", authController.signIn);

module.exports = router;
