const jwt = require("jsonwebtoken");
const { errorResponse } = require("../utils/errorResponse");
const { getUserByEmail } = require("../services");

exports.getParamsToken = async (req, res, next) => {
  const { token } = req.params;

  if (!token) {
    return errorResponse(req, res, 401, "token required.");
  }
  req.token = token;
  next();
};

exports.getAuthToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return errorResponse(
      req,
      res,
      401,
      "authentication error. token required."
    );
  }

  req.token = authHeader.split(" ")[1];
  next();
};

exports.verifyToken = async (req, res, next) => {
  try {
    const token = req.token;
    const { email } = jwt.verify(token, process.env.SECRET_MESSAGE);

    const verifyUser = await getUserByEmail(email);

    if (!verifyUser.length) {
      return errorResponse(req, res, 404, "user not found");
    }

    req.user = verifyUser[0];

    next();
  } catch (error) {
    errorResponse(
      req,
      res,
      401,
      "Not authorized to access this route, token invalid or expired"
    );
  }
};

exports.verifyParamToken = async (req, res, next) => {
  try {
    const token = req.token;
    const { email } = jwt.decode(token);

    const user = await getUserByEmail(email);

    if (!user.length) {
      return errorResponse(req, res, 404, "user not found");
    }

    const { password } = user[0];

    jwt.verify(token, password, (err, result) => {
      if (err) {
        throw new Error(err);
      }
    });

    req.user = user[0];

    next();
  } catch (error) {
    console.log(error.message);
    errorResponse(req, res, 400, "invalid reset url");
  }
};
