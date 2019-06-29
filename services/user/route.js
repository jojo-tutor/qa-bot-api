const express = require('express');
const controller = require('./controller');
const getCommonRoute = require('../../common/route');

const router = express.Router();

// custom or route below
router.put('/change-password', async (req, res) => {
  const { result, error } = await controller.changePassword(req.body);
  if (error) {
    res.status(404).json(error);
  } else {
    res.status(200).json(result);
  }
});

const route = getCommonRoute(router, controller);

module.exports = route;
