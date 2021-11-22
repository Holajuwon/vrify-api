const express = require("express");
const router = express.Router();

const {
  createUser,
  login,
  forgotPassword,
  resetPassword,
  verify,
  verifyAccountNumber,
} = require("../controllers");
const {
  createUserShema,
  loginUserSchema,
  resetPassSchema,
  forgotPassSchema,
  accountNumberSchema,
} = require("../db/schemas");
const validateInput = require("../middlewares/requestValidator/validateInput");
const verifyLogin = require("../middlewares/verifyLogin");
const verifySignup = require("../middlewares/verifySignup");
const verifyUser = require("../middlewares/verifyUser");
const {
  verifyParamToken,
  verifyToken,
  getParamsToken,
  getAuthToken,
} = require("../middlewares/verifyToken");
const checkVerification = require("../middlewares/checkVerification");

router
  .post(
    "/user/signup",
    [validateInput(createUserShema, "body"), verifyUser, verifySignup],
    createUser
  )
  .put(
    "/user/verify/:token",
    [getParamsToken, verifyToken, checkVerification("verifyRoute")],
    verify
  )
  .post(
    "/user/login",
    [validateInput(loginUserSchema, "body"), verifyUser, verifyLogin],
    login
  )
  .post(
    "/user/forgot_password",
    [validateInput(forgotPassSchema, "body"), verifyUser],
    forgotPassword
  )
  .post(
    "/user/reset_password/:resetToken",
    [validateInput(resetPassSchema, "body"), verifyParamToken],
    resetPassword
  )
  .get(
    "/account_number/verify",
    [
      getAuthToken,
      verifyToken,
      checkVerification("verifyAccountNumber"),
      validateInput(accountNumberSchema, "query"),
    ],
    verifyAccountNumber
  );

module.exports = router;
