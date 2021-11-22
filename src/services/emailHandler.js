const nodemailer = require("nodemailer");

/**
 * @description A mailing service that sends a mail to the user
 * @param {String} mail the user's email
 * @param {String} subject the subject of the mail
 * @param {String} text body of the mail in plain text
 * @param {String} html body of the mail in html
 * @returns a mail to the user
 */

module.exports = async (mail, subject, text, html) => {
  const transport = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const mailOptions = {
    from: '"vrify" <noreply@vrify.com>',
    to: mail,
    subject,
    text,
    html,
  };

  return transport.sendMail(mailOptions);
};
