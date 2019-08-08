import getCommonController from 'common/controller';
import AppError from 'utils/error';
import Model from './model';

// custom or override controller below
const customControllers = {
  async validateToken(token) {
    const result = await Model.findOne({ token }) || {};

    if (!result.token) {
      throw new AppError('InvalidTokenError', 400, 'Token is invalid', true);
    }

    if (result.status === 'Expired') {
      throw new AppError('ExpiredTokenError', 400, 'Token is expired', true);
    }

    return result;
  },
};

const controller = getCommonController(Model, customControllers);

export default controller;
