exports.verifyAccountHTML = (req, firstName, token) => {
  return `<div style='display: flex; flex-direction: column; align-items: center'>
    <div>
    <p>Dear ${firstName},</p>
    <p>Thank you for signing up on our platform.</p>
    <p>Follow this link to verify your account. ➡ <a href="${process.env.CLIENT_URL}/verify?verifyToken=${token}">verify your account</a></p>

    <p>Thanks <br/> Vrify Team</p>
    </div>
    </div>`;
};

exports.forgotPasswordHTML = (req, user, token) => {
  return `<div style='display: flex; flex-direction: column; align-items: center'>
    <div>
    <p>Dear ${user.firstName},</p>
    <p>We received a request to reset your password.</p>
    <p>Follow this link to reset your password ➡ <a href="${
      req.protocol
    }://${req.get(
    "host"
  )}/api/v1/user/reset_password/${token}">Reset password Link</a></p>
    <p>If you didn’t ask to reset your password, you can ignore this email.</p>
    <p>Thanks <br/> vrify Team</p>
    </div>
    </div>`;
};

exports.passwordResetHTML = (user) => {
  return `<p>Dear ${user.firstName},</p>
  <p>You have successfully changed your password. </p>
  <p>Thanks for using our service. <br/> vrify &copy; 2021</p>`;
};
