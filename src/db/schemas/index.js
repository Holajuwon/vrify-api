const Joi = require("joi");

exports.createUserShema = {
  schema: Joi.object().keys({
    email: Joi.string().email().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    password: Joi.string().required(),
  }),
  message: "Error creating user",
};

exports.loginUserSchema = {
  schema: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
  message: "Error logging user in",
};

exports.resetPassSchema = {
  schema: Joi.object().keys({
    password: Joi.string().required(),
    // confirmPassword: Joi.string().required(),
  }),
  message: "Error resetting password",
};

exports.forgotPassSchema = {
  schema: Joi.object().keys({
    email: Joi.string().email().required(),
  }),
  message: "Error resetting password",
};

exports.accountNumberSchema = {
  schema: Joi.object().keys({
    accountNumber: Joi.string().required(),
    bankCode: Joi.string().required(),
  }),
  message: "Error verifying account number",
};
