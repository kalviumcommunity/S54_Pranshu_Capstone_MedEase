const express = require("express");
const wrapAsync = require("../utils/wrapAsync.js");
const app = express();
const receptionRouter = express.Router();
var jwt = require("jsonwebtoken");
const ExpressError = require("../utils/ExpressError.js");
const passwordHash = require("password-hash");
const { receptionValidation } = require("../utils/validation.js");
const Reception = require("../models/reception.js");
require("dotenv").config();

receptionRouter.use(express.json());

const validateReception = (req, res, next) => {
  let { error } = receptionValidation.validate(req.body);
  if (error) {
    throw new ExpressError(400, error);
  } else {
    next();
  }
};

receptionRouter.post(
  "/signup",
  validateReception,
  wrapAsync(async (req, res) => {
    let { password } = req.body;
    let hashedPassword = passwordHash.generate(password);
    let newUserData = new Reception({
      name: req.body.name,
      username: req.body.username,
      hospital: req.body.hospital,
      password: hashedPassword,
      contact: req.body.contact,
    });
    let findUser = await Reception.find({ username: req.body.username });
    if (findUser.length == 0) {
      await newUserData.save();
      let token = jwt.sign(
        {
          data: {
            name: req.body.name,
            username: req.body.username,
            hospital: req.body.hospital,
            contact: req.body.contact,
          },
          type: "Reception",
        },
        process.env.JWT_PASS
      );
      res.send(token);
    } else {
      throw new ExpressError(400, "Username Exists");
    }
  })
);

receptionRouter.post(
  "/signin",
  wrapAsync(async (req, res) => {
    let { username,password } = req.body;
    let userFind = await Reception.find({ username: username });
    if (userFind.length != 0) {
      let storedPassword = userFind[0].password;
      if (passwordHash.verify(password, storedPassword)) {
        let token = jwt.sign(
          {
            data: {
              name: userFind[0].name,
              username: userFind[0].username,
              hospital: req.body.hospital,
              contact: userFind[0].contact,
            },
            type: "Reception",
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

receptionRouter.use((err, req, res, next) => {
  let { status = 500, message = "Some error occured..!" } = err;
  res.status(status).send(message);
});

module.exports = receptionRouter;
