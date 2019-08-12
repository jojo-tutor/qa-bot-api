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
  try {
    const signupController = req.body.company_name
      ? CompanyController.createRecord
      : controller.signup;
    const name = req.body.company_name;

    const result = await signupController({ ...req.body, name });
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

router.put('/signup/validate', async (req, res, next) => {
  try {
    // check token
    const result = await TokenController.validateToken(req.query.token);

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
  const result = await TokenController.validateToken(req.query.token).catch(next);
  res.status(200).json(result);
});


router.post('/forgot-password', async (req, res, next) => {
  try {
    const result = await controller.forgotPassword(req.body).catch(next);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

router.get('/reset-password', async (req, res, next) => {
  const result = await TokenController.validateToken(req.query.token).catch(next);
  res.status(200).json(result);
});

router.post('/reset-password', async (req, res, next) => {
  try {
    const result = await controller.resetPassword(req.body).catch(next);
    res.status(200).json(result);
  } catch (error) {
    next(error);
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
  const result = await controller.getLogs(req.query).catch(next);
  res.status(200).json(result);
});

// mocking: NOT available on production
if (process.env.NODE_ENV !== 'production') {
  router.post('/mocks', mocks.create);
  router.delete('/mocks', mocks.delete);
}

export default router;
