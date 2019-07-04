// set environment variables
const envPath = require('path').resolve(process.cwd(), process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env');
require('dotenv').config({ path: envPath });

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
const logger = require('./common/logger');

// local modules - custom error
const AppError = require('./common/error');

// local modules - utils
const { checkToken, getStatusCode } = require('./common/utils');

// local file - swagger
const swaggerDocument = require('./swagger.json');

// local modules - routes
const noauth = require('./services/noauth/route');
const companies = require('./services/company/route');
const users = require('./services/user/route');
const questions = require('./services/question/route');
const tests = require('./services/test/route');
const categories = require('./services/category/route');
const results = require('./services/result/route');
const skills = require('./services/skill/route');

// local modules - models
const UserModel = require('./services/user/model');

// db stuff
const dbOptions = { useNewUrlParser: true };
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`, dbOptions)
  .then(() => logger.info('Successfully connected to database', 'mongoose'))
  .catch(err => logger.error(err.message, 'mongoose'));


// configure passport.js to use the local strategy
passport.use(new LocalStrategy(
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
));

// tell passport how to serialize the user
passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async (id, done) => {
  console.log('Inside deserializeUser callback');
  console.log(`The user id passport saved in the session file store is: ${id}`);
  try {
    const user = await UserModel.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

// express
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
}));

app.use(passport.initialize());
app.use(passport.session());

const checkSession = async (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return next(new AppError('AuthError', 401, 'Authentication required', true));
};

// jwt auth middleware
const checkAuth = async (req, res, next) => {
  const { error } = await checkToken(req.headers.authorization);
  if (error) {
    return next(error);
  }
  return next();
};

// db middleware
const checkDB = (req, res, next) => {
  if (mongoose.connection.readyState) {
    return next();
  }
  return next(new AppError('DBError', 500, 'Database connection failed', true));
};

app.post('/login', async (req, res, next) => {
  passport.authenticate('local', (error, user, info) => {
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

app.post('/logout', (req, res) => {
  req.logout();
  res.status(200).json({ logout: true });
});

// incoming request logger middleware
app.use((req, res, next) => {
  logger.info('Incoming request', req.path);
  next();
});

// app routes
app.use('/', checkDB, noauth);
app.use('/companies', checkSession, companies);
app.use('/users', checkSession, users);
app.use('/questions', checkSession, questions);
app.use('/tests', checkSession, tests);
app.use('/categories', checkSession, categories);
app.use('/results', checkSession, results);
app.use('/skills', checkSession, skills);

// swagger
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, { showExplorer: true }));

// 404 handler middleware
app.use((req, res, next) => next(new AppError('NotFoundError', 404, 'Endpoint not found', true)));

// error logger middleware
app.use((error, req, res, next) => {
  logger.error(error, req.path);
  next(error);
});

// error handler middleware
app.use((error, req, res, next) => { // eslint-disable-line
  const status = getStatusCode(error);
  res.status(status).json({
    name: error.name,
    message: error.message,
  });
});

module.exports = app;
