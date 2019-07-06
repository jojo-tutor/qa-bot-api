const getCommonController = require('common/controller');
const AppError = require('utils/error');
const Model = require('./model');

// custom or override controller below
const customControllers = {
  async validateToken(token) {
    try {
      const result = await Model.findOne({ token }) || {};

      if (!result.token) {
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
};

const controller = getCommonController(Model, customControllers);

module.exports = controller;
