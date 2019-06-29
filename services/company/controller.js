const Model = require('./model');
const UserModel = require('../user/model');
const getCommonController = require('../../common/controller');

// custom or override controller below
const customControllers = {
  async createRecord(data) {
    try {
      const user = new UserModel(data);
      await user.validate();
      const createdCompany = await Model.create(data);
      await UserModel.create({ ...data, company: createdCompany._id }); // eslint-disable-line
      const result = await Model.findById(createdCompany.id);
      return { result };
    } catch (error) {
      return { error };
    }
  },
};

const controller = getCommonController(Model, customControllers);

module.exports = controller;
