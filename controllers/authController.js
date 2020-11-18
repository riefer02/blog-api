const roleModel = require("../models/Role.js");

//Initial Role Creation Function
exports.initRoles = (req, res) => {
  console.log("Initiating Roles...");
  roleModel.count((err, count) => {
    if (!err && count === 0) {
      new roleModel({
        name: "user",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new roleModel({
        name: "moderator",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'moderator' to roles collection");
      });

      new roleModel({
        name: "admin",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
};
