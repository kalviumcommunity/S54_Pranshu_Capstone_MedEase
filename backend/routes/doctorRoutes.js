const express = require("express");
const wrapAsync = require("../utils/wrapAsync.js");
const User = require("../models/user.js");
const app = express();
const doctorRouter = express.Router();
var jwt = require("jsonwebtoken");
const { userValidation, doctorValidation } = require("../utils/validation.js");
const ExpressError = require("../utils/ExpressError.js");
const passwordHash = require("password-hash");
const Doctor = require("../models/doctor.js");
const Hospital = require("../models/hospital.js");
require("dotenv").config();

doctorRouter.use(express.json());

const validateUser = (req, res, next) => {
  let { error } = doctorValidation.validate(req.body);
  if (error) {
    throw new ExpressError(400, error);
  } else {
    next();
  }
};

doctorRouter.get(
  "/",
  wrapAsync(async (req, res) => {
    let data = await Doctor.find();
    if (data.length != 0) {
      res.send(data);
    } else {
      throw new ExpressError(500, "No data");
    }
  })
);

doctorRouter.get(
  "/:email",
  wrapAsync(async (req, res) => {
    let { email } = req.params;
    let result = await Doctor.find({ "contact.email": email });
    if (result.length == 0) {
      throw new ExpressError(404, "User Not found!");
    }
    res.send(result[0]);
  })
);
doctorRouter.post(
  "/signup",
  validateUser,
  wrapAsync(async (req, res) => {
    let { password, hospital } = req.body;
    let hashedPassword = passwordHash.generate(password);
    let findHospital = await Hospital.findOne({ name: hospital });
    if (findHospital != null) {
      let newUserData = new Doctor({
        name: req.body.name,
        password: hashedPassword,
        degree: req.body.degree,
        hospital: findHospital,
        speciality: req.body.speciality,
        bio: req.body.bio,
        image: req.body.image,
        contact: req.body.contact,
      });
      let findUser = await Doctor.find({
        "contact.email": req.body.contact.email,
      });
      if (findUser.length == 0) {
        await newUserData.save();
        let token = jwt.sign(
          {
            data: {
              name: req.body.name,
              degree: req.body.degree,
              hospital: findHospital,
              speciality: req.body.speciality,
              contact: req.body.contact,
            },
            type: "Doctor",
          },
          process.env.JWT_PASS
        );
        res.send(token);
      } else {
        throw new ExpressError(400, "Email Exists");
      }
    } else {
      throw new ExpressError(404, "Hospital not found ");
    }
  })
);
doctorRouter.post(
  "/signin",
  wrapAsync(async (req, res) => {
    let { email, password } = req.body;
    console.log(email);
    let userFind = await Doctor.find({ "contact.email": email });

    if (userFind.length != 0) {
      let storedPassword = userFind[0].password;
      if (passwordHash.verify(password, storedPassword)) {
        let token = jwt.sign(
          {
            data: {
              name: userFind[0].name,
              degree: userFind[0].degree,
              hospital: userFind[0].hospital,
              speciality: userFind[0].speciality,
              contact: userFind[0].contact,
            },
            type: "Doctor",
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

doctorRouter.use((err, req, res, next) => {
  let { status = 500, message = "Some error occured..!" } = err;
  res.status(status).send(message);
});

module.exports = doctorRouter;
