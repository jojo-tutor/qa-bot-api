const express = require('express');

const { getPermissions } = require('common/middleware');
const getCommonRoute = require('common/route');
const controller = require('./controller');

const router = express.Router();

// custom or route below
const middlewares = [getPermissions];

const route = getCommonRoute(router, controller, middlewares);

module.exports = route;
