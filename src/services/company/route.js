const express = require('express');

const getCommonRoute = require('common/route');
const controller = require('./controller');

const router = express.Router();

// custom or route below

const route = getCommonRoute(router, controller);

module.exports = route;
