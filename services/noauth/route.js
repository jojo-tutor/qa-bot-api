const express = require('express');
const logger = require('../../common/logger');
const AppError = require('../../common/error');
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

router.post('/login', async (req, res, next) => {
  const { result, error } = await controller.login(req.body);
  if (error) {
    next(error);
  } else {
    res.status(200).json(result);
  }
});

router.get('/logs', (req, res, next) => {
  // Find items logged between today and yesterday only
  const options = {
    from: new Date() - (24 * 60 * 60 * 1000),
    until: new Date(),
    limit: 10,
    start: 0,
    order: 'desc',
  };
  logger.query(options, (error, result) => {
    if (error) {
      next(new AppError('LoggerQueryError', 400, error.message, true));
    }

    res.status(200).json(result);
  });
});

module.exports = router;
