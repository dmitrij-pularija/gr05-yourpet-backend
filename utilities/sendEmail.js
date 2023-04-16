const sgMail = require("@sendgrid/mail");

const { SENDGRID_API_KEY, BASE_URL } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (token, email) => {
  const message = {
    from: "bc134usd@gmail.com",
    to: email,
    subject: "Verifying email",
    html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${token}">Click to verify email address</a>`,
  };

  await sgMail.send(message);
  return true;
};

module.exports = sendEmail;