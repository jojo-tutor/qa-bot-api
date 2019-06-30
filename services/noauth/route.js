const express = require('express');
const controller = require('./controller');

const router = express.Router();

router.get('/', (req, res) => res.status(200).json({
  server_locale: new Date().toUTCString(),
  available_endpoints: [
    '/companies',
    '/users',
    '/questions',
    '/tests',
    '/categories',
    '/results',
    '/skills',
  ],
}));

router.post('/signup', async (req, res, next) => {
  const { result, error } = await controller.signup(req.body);
  if (error) {
    next(error);
  } else {
    res.status(200).json(result);
  }
});

router.get('/signup/validate', async (req, res, next) => {
  const { result, error } = await controller.validateSignup(req.query);
  if (error) {
    next(error);
  } else {
    res.status(200).json(result);
  }
});

router.post('/login', async (req, res, next) => {
  const { result, error } = await controller.login(req.body);
  if (error) {
    next(error);
  } else {
    res.status(200).json(result);
  }
});

router.get('/logs', async (req, res, next) => {
  const { result, error } = await controller.getLogs(req.query);
  if (error) {
    next(error);
  } else {
    res.status(200).json(result);
  }
});

module.exports = router;
