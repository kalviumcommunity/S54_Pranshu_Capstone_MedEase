const Joi = require("joi");

exports.userValidation = Joi.object({
  name: Joi.string().required(),
  username: Joi.string().required(),
  password: Joi.string()
    .pattern(new RegExp("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d@$!%*?&]{8,}$"))
    .required(),
  contact: Joi.object({
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required(),
    phone: Joi.number().integer().min(1111111111).max(9999999999).required(),
  }).required(),
});

exports.receptionValidation = Joi.object({
  name: Joi.string().required(),
  username: Joi.string().required(),
  password: Joi.string()
    .pattern(new RegExp("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d@$!%*?&]{8,}$"))
    .required(),
  hospital: Joi.string().required(),
  contact: Joi.object({
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required(),
    phone: Joi.number().integer().min(1111111111).max(9999999999).required(),
  }).required(),
});

exports.appointmentValidation = Joi.object({
  name: Joi.string().required(),
  age: Joi.number().required(),
  weight: Joi.number(),
  issue: Joi.string().required(),
  preMedication: Joi.string(),
});

exports.doctorValidation = Joi.object({
  name: Joi.string().required(),
  username: Joi.string().required(),
  password: Joi.string()
    .pattern(new RegExp("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d@$!%*?&]{8,}$"))
    .required(),
  degree: Joi.string().required(),
  hospital: Joi.string().required(),
  speciality: Joi.string().required(),
  contact: Joi.object({
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required(),
    phone: Joi.number().integer().min(1111111111).max(9999999999).required(),
  }).required(),
});

exports.hospitalValidation = Joi.object({
  name: Joi.string().required(),
  password: Joi.string()
    .pattern(new RegExp("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d@$!%*?&]{8,}$"))
    .required(),
  contact: Joi.object({
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required(),
    phone: Joi.number().integer().min(1111111111).max(9999999999).required(),
  }).required(),
});
