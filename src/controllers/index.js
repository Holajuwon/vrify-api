const { createUser, updatePassword, verifyAccount } = require("../services");
const { errorResponse } = require("../utils/errorResponse");
const generateToken = require("../utils/generateToken");
const { successResponse } = require("../utils/successResponse");
const emailHandler = require("../services/emailHandler");
const { verifyAccountHTML } = require("../constants");
const verifyAccountNumber = require("../services/verifyAccountNumber");

module.exports = {
  /**
   * @desc create user
   * @route POST /api/v1/user
   * @access public
   * @param {Request} req http request object
   * @param {Response} res http response object
   * @returns {object} a success response containing user object
   */
  createUser: async (req, res) => {
    try {
      const { body } = req;
      const user = await createUser(body);
      let { id, first_name, last_name, email } = user;
      const token = generateToken(id, email);
      const html = verifyAccountHTML(req, first_name, token);
      await emailHandler(
        email,
        "Welcome to vrify, please verify your account.",
        "Verify your account",
        html
      );
      let result = {
        id,
        first_name,
        last_name,
        email,
        token,
      };
      successResponse(res, 201, "User created successfully", result);
    } catch (error) {
      errorResponse(req, res, 500, error.message);
    }
  },

  verify: async (req, res) => {
    try {
      const { email } = req.user;
      const user = await verifyAccount(email);
      successResponse(res, 200, "Account verified successfully", user);
    } catch (error) {
      errorResponse(req, res, 500, error.message);
    }
  },

  verifyAccountNumber: async (req, res) => {
    try {
      const { accountNumber, bankCode } = req.query;
      const response = await verifyAccountNumber(accountNumber, bankCode);
      if(!response.data) {
        errorResponse(req, res, 400, "Account number is invalid");
      }
      successResponse(res, 200, "Account verified successfully", response.data);
    } catch (error) {
      errorResponse(req, res, 500, error.message);
    }
  },

  /**
   * @desc login user
   * @route POST /api/v1/user/login
   * @access public
   * @param {Request} req http request object
   * @param {Response} res http response object
   * @returns {object} a success response containing user object
   */
  login: async (req, res) => {
    try {
      let { id, first_name, last_name, email } = req.user;
      let token = generateToken(id, email);
      const result = {
        id,
        first_name,
        last_name,
        email,
        token,
      };
      successResponse(res, 200, "User logged in successfully", result);
    } catch (error) {
      errorResponse(req, res, 500, error.message);
    }
  },

  forgotPassword: async (req, res) => {
    try {
      const { user } = req;

      if (!user) {
        errorResponse(req, res, 404, "You do not have an account with us.");
      }
      const { email, password, id } = user;
      const token = generateToken(id, email, password, "1h");
      successResponse(res, 200, "Password reset link sent successfully", {
        resetURL: `${req.get("host")}/api/v1/user/reset_password/${token}`,
      });
    } catch (error) {
      errorResponse(req, res, 500, error.message);
    }
  },
  resetPassword: async (req, res) => {
    try {
      const { user } = req;
      const { password } = req.body;

      let result = await updatePassword(password, user.id);
      successResponse(res, 200, "Password reset successfully", result);
    } catch (error) {
      errorResponse(req, res, 500, error.message);
    }
  },
};
