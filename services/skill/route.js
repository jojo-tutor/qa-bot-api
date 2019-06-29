const express = require('express');
const controller = require('./controller');
const getCommonRoute = require('../../common/route');

const router = express.Router();

// custom or route below

const route = getCommonRoute(router, controller);

module.exports = route;
