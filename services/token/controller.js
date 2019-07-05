const Model = require('./model');
const getCommonController = require('../../common/controller');

// custom or override controller below
const customControllers = {};

const controller = getCommonController(Model, customControllers);

module.exports = controller;
