import getCommonController from 'common/controller';
import Model from './model';

// custom or override controller below
const customControllers = {
  async getRecord(id) {
    return Model
      .findById(id)
      .populate('categories')
      .populate('skills')
      .populate('questions');
  },
};

const controller = getCommonController(Model, customControllers);

export default controller;
