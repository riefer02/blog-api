const authJwt = require("./authJwt");
const verifySignUp = require("./verifySignUp");

const setResponseHeaders = (req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
};

module.exports = {
  authJwt,
  verifySignUp,
  setResponseHeaders
};
