var express = require("express");
var router = express.Router();

const userController = require("../controllers/userController.js");

const { authJwt, setResponseHeaders } = require("../middleware");

router.get("/test/all", setResponseHeaders, userController.allAccess);
router.get(
  "/test/user",
  [setResponseHeaders, authJwt.verifyToken],
  userController.userBoard
);
router.get(
  "/test/mod",
  [setResponseHeaders, authJwt.verifyToken, authJwt.isModerator],
  userController.moderatorBoard
);
router.get(
  "/test/admin",
  [setResponseHeaders, authJwt.verifyToken, authJwt.isAdmin],
  userController.adminBoard
);

module.exports = router;
