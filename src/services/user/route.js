import express from 'express';
import { getPermissions } from 'common/middleware';
import getCommonRoute from 'common/route';
import controller from './controller';

const router = express.Router();

// custom or route below
const middlewares = [getPermissions];

router.put('/change-password', async (req, res, next) => {
  const result = await controller.changePassword(req.body).catch(next);
  res.status(200).json(result);
});

router.put('/reset-password', async (req, res, next) => {
  const result = await controller.resetPassword(req.body).catch(next);
  res.status(200).json(result);
});

const route = getCommonRoute(router, controller, middlewares);

export default route;
