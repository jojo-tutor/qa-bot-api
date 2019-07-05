const express = require('express');
const passport = require('passport');
const controller = require('./controller');
const UserModel = require('../user/model');
const TokenModel = require('../token/model');

const router = express.Router();

const AppError = require('../../common/error');

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
  try {
    const {
      _id: id, token, status, email,
    } = await TokenModel.findOne({ token: req.query.token }) || {};

    if (!token) {
      return next(new AppError('InvalidTokenError', 400, 'Token is invalid', true));
    }

    if (status === 'Expired') {
      return next(new AppError('ExpiredTokenError', 400, 'Token is expired', true));
    }

    req.body.email = email;

    return passport.authenticate('local-signup', (error, user) => {
      if (error) {
        return next(error);
      }
      return req.login(user, async (err) => {
        if (err) {
          return next(err);
        }

        await TokenModel.findByIdAndUpdate(id, { status: 'Expired' });

        return res.status(200).json(user);
      });
    })(req, res, next);
  } catch (error) {
    return next(error);
  }
});

router.post('/login', async (req, res, next) => {
  passport.authenticate('local-login', (error, user, info) => {
    if (error) {
      return next(error);
    }
    if (info) {
      return next(new AppError(null, 400, info.message, true));
    }
    return req.login(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.status(200).json(user);
    });
  })(req, res, next);
});

router.post('/logout', (req, res) => {
  req.logout();
  res.status(200).json({ logout: true });
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
