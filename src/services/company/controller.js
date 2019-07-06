const getCommonController = require('common/controller');
const UserModel = require('services/user/model');
const Model = require('./model');

// custom or override controller below
const customControllers = {
  async createRecord(data) {
    try {
      // validate user
      await new UserModel(data).validate();

      // create company
      const createdCompany = await Model.create(data);

      // crate user
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
