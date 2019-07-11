const getCommonController = require('common/controller');
const { generateToken, hashPassword } = require('utils/tools');
const mailer = require('utils/mailer');
const TokenModel = require('services/token/model');
const TokenController = require('services/token/controller');
const CompanyModel = require('services/company/model');
const Model = require('./model');
const { CompanyUser } = require('./model');

// custom or override controller below
const customControllers = {
  async getRecord(id) {
    try {
      const result = await Model.findById(id, '-password').populate('company');
      return { result };
    } catch (error) {
      return { error };
    }
  },

  async createRecord(data) {
    try {
      await new CompanyUser(data).validate();

      const company = await CompanyModel.findById(data.company);

      const result = await Model.create({
        email: data.email,
        company: data.company,
        password: generateToken(), // dont worry, this will be set on email verification
      });

      // create token and send invite email
      const randomToken = generateToken();
      const { token } = await TokenModel.create({ token: randomToken, email: data.email });
      await mailer({
        to: data.email,
        subject: '[QA-Bot] Reset Your Password',
        data: {
          header: `You've been invited to ${company.name}. Let's reset your password.`,
          description: 'By clicking on the following link you are resetting your password.',
          button_label: 'Reset Password',
          button_link: `${process.env.PORTAL_HOST}/reset-password?token=${token}`,
        },
      });

      return { result };
    } catch (error) {
      return { error };
    }
  },

  async changePassword(data) {
    try {
      // check required fields
      await new Model.Password(data).validate();

      // hash password
      const passwordHash = await hashPassword(data.password);

      // update user
      await Model.updateOne({ email: data.email }, { password: passwordHash }).orFail();
      const result = {
        updated: true,
        email: data.email,
      };
      return { result };
    } catch (error) {
      return { error };
    }
  },

  async resetPassword(data) {
    try {
      // check required fields
      await new Model.Password(data).validate();

      // check token
      const { result, error } = await TokenController.validateToken(data.token);

      if (error) {
        return { error };
      }

      // hash password
      const passwordHash = await hashPassword(data.password);

      // update user
      await Model.updateOne({ email: result.email }, { password: passwordHash, status: 'Active' }).orFail();

      // update token
      await TokenController.updateRecord(result.id, { status: 'Expired' });

      return { result: { updated: true } };
    } catch (error) {
      return { error };
    }
  },
};

const controller = getCommonController(Model, customControllers);

module.exports = controller;
