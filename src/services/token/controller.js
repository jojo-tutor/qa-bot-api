const getCommonController = require('common/controller');
const Model = require('./model');

// custom or override controller below
const customControllers = {};

const controller = getCommonController(Model, customControllers);

module.exports = controller;
