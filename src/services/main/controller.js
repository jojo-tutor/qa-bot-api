

import getCommonController from 'common/controller';
import logger from 'utils/logger';
import AppError from 'utils/error';
import { hashPassword, generateToken } from 'utils/tools';
import mailer from 'utils/mailer';
import TokenModel from 'services/token/model';
import TokenController from 'services/token/controller';
import UserModel from 'services/user/model';

// custom or override controller below
const customControllers = {
  async signup(data, { role }) {
    try {
      const passwordHash = await hashPassword(data.password);
      const randomToken = generateToken();
      const { token } = await TokenModel.create({ token: randomToken, email: data.email });
      const result = await UserModel.create({
        email: data.email,
        password: passwordHash,
        role: role || 'Guest',
      });

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

      return { result };
    } catch (error) {
      return { error };
    }
  },

  async inviteValidate(data) {
    try {
      // check token
      const { result, error } = await TokenController.validateToken(data.token);

      if (error) {
        return { error };
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

export default controller;
