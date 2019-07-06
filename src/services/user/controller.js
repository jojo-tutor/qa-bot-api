const getCommonController = require('common/controller');
const AppError = require('utils/error');
const { generateToken, hashPassword } = require('utils/tools');
const mailer = require('utils/mailer');
const TokenModel = require('services/token/model');
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

      const result = await Model.create(data);

      // create token and send invite email
      const randomToken = generateToken();
      const { token } = await TokenModel.create({ token: randomToken, email: data.email });
      await mailer({ to: data.email, token, link: process.env.VALIDATE_INVITE_LINK });

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

      const {
        _id: id, token, status,
      } = await TokenModel.findOne({ token: data.token }) || {};

      if (!token) {
        throw new AppError('InvalidTokenError', 400, 'Token is invalid', true);
      }

      if (status === 'Expired') {
        throw new AppError('ExpiredTokenError', 400, 'Token is expired', true);
      }

      // hash password
      const passwordHash = await hashPassword(data.password);

      // update user
      await Model.updateOne({ email: data.email }, { password: passwordHash, status: 'Active' }).orFail();

      // update token
      await TokenModel.findByIdAndUpdate(id, { status: 'Expired' });

      const result = { updated: true };
      return { result };
    } catch (error) {
      return { error };
    }
  },
};

const controller = getCommonController(Model, customControllers);

module.exports = controller;
