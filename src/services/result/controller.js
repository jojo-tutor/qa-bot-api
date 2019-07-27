import getCommonController from 'common/controller';
import Model from './model';

// custom or override controller below
const customControllers = {};

const controller = getCommonController(Model, customControllers);

export default controller;
