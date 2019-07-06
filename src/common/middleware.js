const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  cookie: {
    maxAge: Number(process.env.SESSION_MAX_AGE_IN_DAYS) * 24 * 60 * 60 * 1000,
  },
});

module.exports = {
  sessionMiddleware,
};
