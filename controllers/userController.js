const userModel = require("../models/User.js");

exports.signUp = async (req, res) => {
  const newUser = await userModel.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      user: newUser,
    },
  });
};

