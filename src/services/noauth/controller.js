

const getCommonController = require('common/controller');
const logger = require('utils/logger');
const AppError = require('utils/error');
const { hashPassword, generateToken } = require('utils/tools');
const mailer = require('utils/mailer');
const TokenModel = require('services/token/model');
const UserModel = require('services/user/model');

// custom or override controller below
const customControllers = {
  async signup(data) {
    try {
      const passwordHash = await hashPassword(data.password);
      const randomToken = generateToken();
      const { token } = await TokenModel.create({ token: randomToken, email: data.email });
      const result = await UserModel.create({ ...data, password: passwordHash });
      await mailer({ to: result.email, token });

      return { result };
    } catch (error) {
      return { error };
    }
  },

  async inviteValidate(data) {
    try {
      const result = await TokenModel.findOne({ token: data.token });

      if (!result) {
        throw new AppError('InvalidTokenError', 400, 'Token is invalid', true);
      }

      if (result.status === 'Expired') {
        throw new AppError('ExpiredTokenError', 400, 'Token is expired', true);
      }

      return { result };
    } catch (error) {
      return { error };
    }
  },

  async getLogs(data) {
    // Find items logged between today and yesterday only
    try {
      const options = {
        from: new Date() - (24 * 60 * 60 * 1000),
        until: new Date(),
        limit: 10,
        start: 0,
        order: 'desc',
        ...data,
      };

      return new Promise((resolve, reject) => {
        logger.query(options, (error, result) => {
          if (error) {
            reject(new AppError('LoggerQueryError', 400, error.message, true));
          }

          resolve({ result });
        });
      });
    } catch (error) {
      return { error };
    }
  },
};

const controller = getCommonController(UserModel, customControllers);

module.exports = controller;
