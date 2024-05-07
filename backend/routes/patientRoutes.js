const express = require("express");
const wrapAsync = require("../utils/wrapAsync.js");
const User = require("../models/user.js");
const app = express();
const patientRouter = express.Router();
var jwt = require("jsonwebtoken");
const { userValidation } = require("../utils/validation.js");
const ExpressError = require("../utils/ExpressError.js");
const passwordHash = require("password-hash");
require("dotenv").config();

patientRouter.use(express.json());

const validateUser = (req, res, next) => {
  let { error } = userValidation.validate(req.body);
  if (error) {
    throw new ExpressError(400, error);
  } else {
    next();
  }
};

patientRouter.get(
  "/",
  wrapAsync(async (req, res) => {
    let data = await User.find();
    if (data.length != 0) {
      res.send(data);
    } else {
      throw new ExpressError(500, "No data");
    }
  })
);

patientRouter.get(
  "/:username",
  wrapAsync(async (req, res) => {
    let { username } = req.params;

    let result = await User.find({ username: username });

    if (result.length == 0) {
      res.status(404).json("User Not found!");
    }
    res.send(result[0]);
  })
);
patientRouter.post(
  "/signup",
  validateUser,
  wrapAsync(async (req, res) => {
    let { password } = req.body;
    let hashedPassword = passwordHash.generate(password);
    let newUserData = new User({
      name: req.body.name,
      username: req.body.username,
      password: hashedPassword,
      contact: req.body.contact,
    });
    let findUser = await User.find({ username: req.body.username });
    if (findUser.length == 0) {
      await newUserData.save();
      let token = jwt.sign(
        {
          data: {
            name: req.body.name,
            username: req.body.username,
            contact: req.body.contact,
          },
          type: "Patient",
        },
        process.env.JWT_PASS
      );
      res.send(token);
    } else {
      throw new ExpressError(400, "Username Exists");
    }
  })
);

patientRouter.post(
  "/signin",
  wrapAsync(async (req, res) => {
    let { username, password } = req.body;
    let userFind = await User.find({ username: username });
    if (userFind.length != 0) {
      let storedPassword = userFind[0].password;
      if (passwordHash.verify(password, storedPassword)) {
        let token = jwt.sign(
          {
            data: {
              name: userFind[0].name,
              username: userFind[0].username,
              contact: userFind[0].contact,
            },
            type: "Patient",
          },
          process.env.JWT_PASS
        );
        res.send(token);
      } else {
        throw new ExpressError(401, "Wrong Password!");
      }
    } else {
      throw new ExpressError(404, "Username not found!");
    }
  })
);

patientRouter.use((err, req, res, next) => {
  let { status = 500, message = "Some error occured..!" } = err;
  res.status(status).send(message);
});

module.exports = patientRouter;
