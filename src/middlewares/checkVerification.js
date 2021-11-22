const { errorResponse } = require("../utils/errorResponse");

module.exports = (type) => (req, res, next) => {
  try {
    const { user } = req;
    if (type === "verifyAccountNumber") {
      if (!user.is_verified) {
        return errorResponse(
          req,
          res,
          400,
          "You have not verified your account."
        );
      }
      return next();
    }

    if (user.is_verified) {
      return errorResponse(
        req,
        res,
        400,
        "You have already verified your account."
      );
    }
    return next();
  } catch (error) {
    next(error);
  }
};
