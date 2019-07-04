const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// local modules - logger
const logger = require('./logger');

// local modules - custom error
const AppError = require('./error');

// local modules - models
const UserModel = require('../services/user/model');

const passportMiddleware = new LocalStrategy(
  { usernameField: 'email' },
  async (email, password, done) => {
    const error = new AppError('AuthError', 400, 'Invalid email and/or password', true);
    try {
      // get user
      const user = await UserModel.findOne({ email });
      if (!user) {
        return done(error);
      }

      // compare passwords
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        return done(error);
      }

      return done(null, user);
    } catch (err) {
      return done(new AppError(err.name, 400, err.message, true));
    }
  },
);

const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
});

module.exports = {
  passportMiddleware,
  sessionMiddleware,
};
