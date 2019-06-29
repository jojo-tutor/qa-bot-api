const Model = require('./model');
const logger = require('../../common/logger');
const getCommonController = require('../../common/controller');
const { hashPassword } = require('../../common/utils');

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

  async changePassword(data) {
    try {
      // check required fields
      const password = new Model.Password(data);
      await password.validate();

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
};

const controller = getCommonController(Model, customControllers);

module.exports = controller;
