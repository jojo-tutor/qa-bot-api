const getCommonController = require('common/controller');
const Model = require('./model');

// custom or override controller below
const customControllers = {
  async getRecord(id) {
    try {
      const result = await Model
        .findById(id)
        .populate('categories')
        .populate('skills')
        .populate('questions');
      return { result };
    } catch (error) {
      return { error };
    }
  },
};

const controller = getCommonController(Model, customControllers);

module.exports = controller;
