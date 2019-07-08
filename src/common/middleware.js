const mongoose = require('mongoose');
const session = require('express-session');
const mergeWith = require('lodash/mergeWith');
const MongoStore = require('connect-mongo')(session);

const logger = require('utils/logger');
const AppError = require('utils/error');

const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  cookie: {
    maxAge: Number(process.env.SESSION_MAX_AGE_IN_DAYS) * 24 * 60 * 60 * 1000,
  },
});

const authMiddleware = async (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return next(new AppError('AuthError', 401, 'Authentication required', true));
};

const can = (rolePermissionsList, resourcePermission, role) => {
  const [resource, permission] = resourcePermission.split(':');

  const rolePermission = rolePermissionsList[role];
  if (!rolePermission) {
    return false;
  }

  if (rolePermission.inherits) {
    const inheritedCan = rolePermissionsList[rolePermission.inherits].can;
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

const getPermissions = async (req, res, next) => {
  const [baseUrl] = req.originalUrl.split('/').filter(Boolean);
  const permissions = `${baseUrl}:${req.method.toLowerCase()}`;
  const rolePermissionsList = {
    Guest: {
      can: [
        {
          resource: 'tests',
          permissions: ['get'],
        },
        {
          resource: 'questions',
          permissions: ['get'],
        },
      ],
    },
    Candidate: {
      can: [
        {
          resource: 'tests',
          permissions: ['put'],
        },
        {
          resource: 'results',
          permissions: ['get', 'put'],
        },
      ],
      inherits: 'Guest',
    },
    Admin: {
      can: [
        {
          resource: 'users',
          permissions: ['all'],
        },
        {
          resource: 'categories',
          permissions: ['all'],
        },
        {
          resource: 'questions',
          permissions: ['all'],
        },
        {
          resource: 'results',
          permissions: ['all'],
        },
        {
          resource: 'skills',
          permissions: ['all'],
        },
        {
          resource: 'tests',
          permissions: ['all'],
        },
      ],
      inherits: 'Candidate',
    },
    Super_Admin: {
      can: [
        {
          resource: 'logs',
          permissions: ['all'],
        },
      ],
      inherits: 'Admin',
    },
  };


  const { role } = req.user;
  logger.info(JSON.stringify({ role, permissions }), 'getPermissions');

  if (can(rolePermissionsList, permissions, role)) {
    return next();
  }

  return next(new AppError('AccessError', 403, 'Access denied', true));
};

module.exports = {
  sessionMiddleware,
  authMiddleware,
  getPermissions,
};
