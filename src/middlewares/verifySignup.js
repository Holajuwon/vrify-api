const { errorResponse } = require("../utils/errorResponse");

module.exports = async (req, res, next) => {
  const { user } = req;
  if (user) {
    return errorResponse(req, res, 400, "You already have an account with us");
  }

  return next();
};
