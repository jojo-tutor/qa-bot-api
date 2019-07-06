const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

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

const permissionMiddleware = permissions => async (req, res, next) => {
  if (permissions.includes(req.user.role)) {
    return next();
  }
  return next(new AppError('PermissionError', 401, 'Cannot access resource with current permission', true));
};

module.exports = {
  sessionMiddleware,
  authMiddleware,
  permissionMiddleware,
};
