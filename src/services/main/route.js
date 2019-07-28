import express from 'express';
import passport from 'passport';

import mocks from 'mocks';
import AppError from 'utils/error';
import { authMiddleware, getPermissions } from 'common/middleware';
import TokenController from 'services/token/controller';
import CompanyController from 'services/company/controller';
import controller from './controller';

const router = express.Router();

router.get('/', (req, res) => res.status(200).json({
  server_locale: new Date().toUTCString(),
}));

router.get('/session', authMiddleware, (req, res) => {
  res.status(200).json(req.user);
});

router.post('/signup', async (req, res, next) => {
  const signupController = req.body.company_name
    ? CompanyController.createRecord
    : controller.signup;
  const name = req.body.company_name;

  const { result, error } = await signupController({ ...req.body, name });
  if (error) {
    next(error);
  } else {
    res.status(200).json(result);
  }
});

router.get('/signup/validate', async (req, res, next) => {
  try {
    // check token
    const { result, error: tokenError } = await TokenController.validateToken(req.query.token);
    if (tokenError) {
      return next(tokenError);
    }

    req.body.email = result.email;

    return passport.authenticate('local-signup', (error, user) => {
      if (error) {
        return next(error);
      }
      return req.login(user, async (err) => {
        if (err) {
          return next(err);
        }

        await TokenController.updateRecord(result.id, { status: 'Expired' });

        return res.status(200).json(user);
      });
    })(req, res, next);
  } catch (error) {
    return next(error);
  }
});

router.get('/invite/validate', async (req, res, next) => {
  const { result, error } = await controller.inviteValidate(req.query);
  if (error) {
    next(error);
  } else {
    res.status(200).json(result);
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

router.get('/logs', authMiddleware, getPermissions, async (req, res, next) => {
  const { result, error } = await controller.getLogs(req.query);
  if (error) {
    next(error);
  } else {
    res.status(200).json(result);
  }
});

// mocking: NOT available on production
if (process.env.NODE_ENV !== 'production') {
  router.post('/mocks', mocks.create);
  router.delete('/mocks', mocks.delete);
}

export default router;
