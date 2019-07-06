const sgMail = require('@sendgrid/mail');

// https://github.com/sendgrid/sendgrid-nodejs
const mailer = async ({ to, token }) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to,
    from: process.env.SUPPORT_EMAIL,
    templateId: 'd-69e94c8479ee4a749bd02db9fe7a33ff',
    dynamic_template_data: {
      validate_signup_link: `${process.env.VALIDATE_SIGNUP_LINK}?token=${token}`,
    },
  };
  await sgMail.send(msg);
};

module.exports = mailer;
