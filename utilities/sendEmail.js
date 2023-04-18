const sgMail = require("@sendgrid/mail");

const { SENDGRID_API_KEY, BASE_URL } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (token, email, name = "") => {
  const message = {
    from: "bc134usd@gmail.com",
    to: email,
    subject: "Verifying email",
    html: `
      ${name && `<p>Hi ${name}</p>`}
      <p>Please click the button below to verify your email address:</p>
      <a href="${BASE_URL}/users/verify/${token}">
        <button style="background-color: #007bff; color: #fff; padding: 10px 20px; border: none;  border-radius: 5px; cursor: pointer;">
          Verify Email Address
        </button>
      </a>
    `,
  };

  await sgMail.send(message);
  return true;
};

module.exports = sendEmail;