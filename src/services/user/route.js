import express from 'express';
import { getPermissions } from 'common/middleware';
import getCommonRoute from 'common/route';
import controller from './controller';

const router = express.Router();

// custom or route below
const middlewares = [getPermissions];

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

const route = getCommonRoute(router, controller, middlewares);

export default route;
