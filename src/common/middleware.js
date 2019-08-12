import mongoose from 'mongoose';
import session from 'express-session';
import mergeWith from 'lodash/mergeWith';
import connectMongo from 'connect-mongo';

import logger from 'utils/logger';
import AppError from 'utils/error';
import permissionsLookupList from 'config/permissions';

const MongoStore = connectMongo(session);

export const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  cookie: {
    maxAge: Number(process.env.SESSION_MAX_AGE_IN_DAYS) * 24 * 60 * 60 * 1000,
  },
});

export const authMiddleware = async (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return next(new AppError('AuthError', 401, 'Authentication required', true));
};

const hasPermission = (permissionList, resourcePermission, role) => {
  const [resource, permission] = resourcePermission.split(':');

  const rolePermission = permissionList[role];
  if (!rolePermission) {
    return false;
  }

  if (rolePermission.inherits) {
    const inheritedCan = permissionList[rolePermission.inherits].can;
    rolePermission.can = [...inheritedCan, ...rolePermission.can];
  }

  const resourceCan = rolePermission.can.filter(e => e.resource === resource);
  if (!resourceCan.length) {
    return false;
  }

  const customizer = (objValue, srcValue) => {
    if (Array.isArray(objValue)) {
      return [...objValue, ...srcValue];
    }
    return undefined;
  };

  const resourcePermissions = resourceCan.reduce((l, r) => mergeWith(l, r, customizer), {});

  if (resourcePermissions.permissions.includes('all')) {
    return true;
  }

  return resourcePermissions.permissions.includes(permission);
};

export const getPermissions = async (req, res, next) => {
  try {
    const [url] = req.originalUrl.split('/').filter(Boolean);
    const [base] = url.split('?');
    const permissions = `${base}:${req.method.toLowerCase()}`;

    const { role } = req.user;
    logger.info(JSON.stringify({ role, permissions }), 'getPermissions');

    if (hasPermission(permissionsLookupList, permissions, role)) {
      return next();
    }

    return next(new AppError('AccessError', 403, 'Access denied', true));
  } catch (error) {
    return next(new AppError('InternalServerError', 500, 'Something went wrong with the server', true));
  }
};
