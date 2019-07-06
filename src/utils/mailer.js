const sgMail = require('@sendgrid/mail');

// https://github.com/sendgrid/sendgrid-nodejs
const mailer = async ({ to, token, link = process.env.VALIDATE_SIGNUP_LINK }) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to,
    from: process.env.SUPPORT_EMAIL,
    templateId: process.env.EMAIL_SIGNUP_TEMPLATE,
    dynamic_template_data: {
      validate_signup_link: `${link}?token=${token}`,
    },
  };
  await sgMail.send(msg);
};

module.exports = mailer;
