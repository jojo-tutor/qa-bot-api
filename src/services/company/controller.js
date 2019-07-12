const getCommonController = require('common/controller');
const UserModel = require('services/user/model');
const TokenModel = require('services/token/model');
const { hashPassword, generateToken } = require('utils/tools');
const mailer = require('utils/mailer');
const Model = require('./model');

// custom or override controller below
const customControllers = {
  async createRecord(data) {
    try {
      // validate user
      await new UserModel(data).validate();

      // create company
      const createdCompany = await Model.create(data);

      // crate user
      const passwordHash = await hashPassword(data.password);
      await UserModel.create({
        ...data, role: 'Company_Admin', password: passwordHash, company: createdCompany.id,
      });

      // create token and send verification email
      const randomToken = generateToken();
      const { token } = await TokenModel.create({ token: randomToken, email: data.email });

      await mailer({
        to: data.email,
        subject: 'Welcome to QA-Bot! Confirm Your Email',
        data: {
          header: 'You\'re on your way. Let\'s confirm your email address.',
          description: 'By clicking on the following link you are confirming your email address.',
          button_label: 'Confirm Email Address',
          button_link: `${process.env.PORTAL_HOST}/signup/validate?token=${token}`,
        },
      });

      const result = await Model.findById(createdCompany.id);
      return { result };
    } catch (error) {
      return { error };
    }
  },
};

const controller = getCommonController(Model, customControllers);

module.exports = controller;
