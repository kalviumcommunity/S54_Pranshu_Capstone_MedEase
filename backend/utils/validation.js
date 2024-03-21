const Joi = require("joi");

exports.userValidation = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
  email: Joi.string().required(),
  userType:Joi.string().required()

})