const jwt = require("jsonwebtoken");
let secret = process.env.SECRET_MESSAGE;
let expiresIn = process.env.EXPIRY_TIME;

module.exports = (user_id, email, message = secret, time = expiresIn) => {
  const payload = {
    id: user_id,
    email: email,
  };
  return jwt.sign(payload, message, {
    expiresIn: time,
  });
};
