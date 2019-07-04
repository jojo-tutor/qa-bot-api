const bcrypt = require('bcrypt');
const logger = require('../../common/logger');
const UserModel = require('../user/model');
const AppError = require('../../common/error');
const getCommonController = require('../../common/controller');
const { hashPassword, generateToken, checkToken } = require('../../common/utils');
const mailer = require('../../common/mailer');

// custom or override controller below
const customControllers = {
  async signup(data) {
    try {
      const passwordHash = await hashPassword(data.password);
      const result = await UserModel.create({ ...data, password: passwordHash });
      const token = await generateToken(result.email);
      await mailer({ to: result.email, token });
      return { result };
    } catch (error) {
      return { error };
    }
  },

  async validateSignup(data) {
    try {
      // check token
      const { result: decoded, error } = await checkToken(`Bearer ${data.token}`);

      // if invalid, throw error and do not proceed
      if (error) {
        throw new AppError(error.name, 400, error.message, true);
      }

      // get user using email
      const user = await UserModel.findOneAndUpdate(
        { email: decoded.email },
        { status: 'Active' },
        { new: true, runValidators: true },
      );
      if (!user) {
        throw new AppError('AccountNotFoundError', 400, 'Cannot find account associated with this token', true);
      }

      // generate user token, like logged in
      const token = await generateToken(data.email);

      const result = {
        token,
        user,
      };
      return { result };
    } catch (error) {
      return { error };
    }
  },

  async login(data) {
    try {
      // check required fields
      await new UserModel.Password(data).validate();

      // get user
      const user = await UserModel.findOne({ email: data.email });
      if (!user) {
        throw new AppError(null, 400, 'Invalid email and/or password', true);
      }

      // compare passwords
      await bcrypt
        .compare(data.password, user.password)
        .then((valid) => {
          if (!valid) {
            throw new AppError(null, 400, 'Invalid email and/or password', true);
          }
        });

      // user token
      const token = await generateToken(data.email);

      const result = {
        token,
        user,
      };
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
