const model = require('./model');
const getCommonController = require('../../common/controller');

const controller = getCommonController(model);

// custom or override controller below
controller.getRecord = async (id) => {
  try {
    const result = await model.findById(id).populate('company');
    return { result };
  } catch (error) {
    console.error(error);
    return { error };
  }
};

module.exports = controller;
