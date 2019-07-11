const sgMail = require('@sendgrid/mail');

// https://github.com/sendgrid/sendgrid-nodejs

const mailer = async ({
  to,
  data,
  subject,
  templateId = process.env.EMAIL_SIGNUP_TEMPLATE,
}) => {
  const {
    header, description, button_label, button_link, // eslint-disable-line
  } = data;

  const msg = {
    to,
    subject,
    templateId,
    from: process.env.SUPPORT_EMAIL,
    dynamic_template_data: {
      subject,
      header,
      description,
      button_label,
      button_link,
    },
  };

  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  await sgMail.send(msg);
};

module.exports = mailer;
