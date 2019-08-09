import sgMail from '@sendgrid/mail';

import AppError from 'utils/error';

// https://github.com/sendgrid/sendgrid-nodejs

const mailer = async ({
  to,
  data,
  subject,
  templateId = process.env.EMAIL_TEMPLATE,
}) => {
  const {
    header, description, button_label, button_link, // eslint-disable-line
  } = data;

  const message = {
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

  await sgMail
    .send(message)
    .catch((err) => {
      throw new AppError('SendGridError', 500, err.message, true);
    });
};

export default mailer;
