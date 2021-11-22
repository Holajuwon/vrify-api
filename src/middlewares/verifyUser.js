const { getUserByEmail } = require("../services");

module.exports = async (req, res, next) => {
  const { email } = req.body;
  const user = await getUserByEmail(email);

  req.user = user[0];
  return next();
};
