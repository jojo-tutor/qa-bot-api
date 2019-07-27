import express from 'express';

import { getPermissions } from 'common/middleware';
import getCommonRoute from 'common/route';
import controller from './controller';

const router = express.Router();

// custom or route below
const middlewares = [getPermissions];

const route = getCommonRoute(router, controller, middlewares);

export default route;
