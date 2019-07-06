const express = require('express');
const getCommonRoute = require('common/route');
const controller = require('./controller');

const router = express.Router();

// custom or route below
router.put('/change-password', async (req, res, next) => {
  const { result, error } = await controller.changePassword(req.body);
  if (error) {
    next(error);
  } else {
    res.status(200).json(result);
  }
});

router.put('/reset-password', async (req, res, next) => {
  const { result, error } = await controller.resetPassword(req.body);
  if (error) {
    next(error);
  } else {
    res.status(200).json(result);
  }
});

const route = getCommonRoute(router, controller);

module.exports = route;
