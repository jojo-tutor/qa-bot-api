const Model = require('./model');
const getCommonController = require('../../common/controller');

// custom or override controller below
const customControllers = {
  async getRecord(id) {
    try {
      const result = await Model.findById(id).populate('company');
      return { result };
    } catch (error) {
      console.error(error);
      return { error };
    }
  },
};

const controller = getCommonController(Model, customControllers);

module.exports = controller;
