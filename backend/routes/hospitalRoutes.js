const express = require("express");
const wrapAsync = require("../utils/wrapAsync.js");
const User = require("../models/user.js");
const app = express();
const hospitalRouter = express.Router();
var jwt = require("jsonwebtoken");
const { userValidation, doctorValidation, hospitalValidation } = require("../utils/validation.js");
const ExpressError = require("../utils/ExpressError.js");
const passwordHash = require("password-hash");
const Doctor = require("../models/doctor.js");
const Hospital = require("../models/hospital.js");
require("dotenv").config();

hospitalRouter.use(express.json());

const validateUser = (req, res, next) => {
  let { error } = hospitalValidation.validate(req.body);
  if (error) {
    throw new ExpressError(400, error);
  } else {
    next();
  }
};

hospitalRouter.get("/",wrapAsync(async(req,res)=>{
  let data = await Hospital.find()
  res.send(data);

}))

hospitalRouter.post(
  "/signup",
  validateUser,
  wrapAsync(async (req, res) => {
    let { password } = req.body;
    let hashedPassword = passwordHash.generate(password);
    let newUserData = new Hospital({
      name: req.body.name,
      password: hashedPassword,
      contact: req.body.contact,
    });
    let findUser = await Hospital.find({ "contact.email": req.body.contact.email });
    if (findUser.length == 0) {
      await newUserData.save();
      let token = jwt.sign(
        {
          data: {
            name: req.body.name,
            contact: req.body.contact,
          },
          type: "Hospital",
        },
        process.env.JWT_PASS
      );
      res.send(token);
    } else {
      throw new ExpressError(400, "Hospital with this email Exists");
    }
  })
);
hospitalRouter.post(
  "/signin",
  wrapAsync(async (req, res) => {
    let { email, password } = req.body;
    let userFind = await Hospital.find({ "contact.email": email });
    console.log("userFind: ", userFind);
    if (userFind.length != 0) {
      let storedPassword = userFind[0].password;
      if (passwordHash.verify(password, storedPassword)) {
        let token = jwt.sign(
          {
            data: {
              name: userFind[0].name,
              contact: userFind[0].contact,
            },
            type: "Hospital",
          },
          process.env.JWT_PASS
        );
        res.send(token);
      } else {
        throw new ExpressError(401, "Wrong Password!");
      }
    } else {
      throw new ExpressError(404, "Email not found!");
    }
  })
);

hospitalRouter.use((err, req, res, next) => {
  let { status = 500, message = "Some error occured..!" } = err;
  res.status(status).send(message);
});

module.exports = hospitalRouter;
