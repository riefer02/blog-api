const Role = require("../models/Role.js");
const User = require("../models/User.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { JWT_SECRET } = require("../config.js");

// User Sign Up Functionality
exports.signUp = async (req, res) => {
  const newUser = await User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  });

  newUser.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    // If new user has a role already assign that to their document
    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles },
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          user.roles = roles.map((role) => role._id);
          user.save((err) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
            const token = jwt.sign({ user }, JWT_SECRET);

            res.status(201).json({
              token,
              user,
            });
          });
        }
      );
      // If new user doesn't have a role give them the role of 'user'
    } else {
      Role.findOne({ name: "user" }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        user.roles = [role._id];
        user.save((err) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          // Give new user JWT Token with secret
          const token = jwt.sign({ user }, JWT_SECRET);

          res.status(201).json({
            token,
            user,
          });
        });
      });
    }
  });
};

exports.signIn = (req, res) => {
  console.log("trying to sign in...");
  User.findOne({
    username: req.body.username,
  })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          token: null,
          message: "Invalid Password!",
        });
      }

      const token = jwt.sign({ id: user.id }, JWT_SECRET, {
        expiresIn: 86400, // 24 hours
      });

      let authorities = [];

      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      }
      res.status(200).send({
        user,
        token,
      });
    });
};

//Initial Role Creation Function
exports.initRoles = (req, res) => {
  console.log("Initiating Roles...");
  Role.count((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "moderator",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'moderator' to roles collection");
      });

      new Role({
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
