// set environment variables
const envPath = require('path').resolve(process.cwd(), process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env');
require('dotenv').config({ path: envPath });

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
// const passport = require('passport');

// local modules - logger
const logger = require('./common/logger');

// local modules - custom error
const AppError = require('./common/error');

// local modules - utils
const { getStatusCode } = require('./common/utils');

// local file - swagger
const swaggerDocument = require('./swagger.json');

// local file - middlewares
const { sessionMiddleware } = require('./common/middleware');

// local file - passport
const passport = require('./common/passport');

// local modules - routes
const noauth = require('./services/noauth/route');
const companies = require('./services/company/route');
const users = require('./services/user/route');
const questions = require('./services/question/route');
const tests = require('./services/test/route');
const categories = require('./services/category/route');
const results = require('./services/result/route');
const skills = require('./services/skill/route');

// db stuff
const dbOptions = { useNewUrlParser: true };
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`, dbOptions)
  .then(() => logger.info('Successfully connected to database', 'mongoose'))
  .catch(err => logger.error(err.message, 'mongoose'));


// express
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(sessionMiddleware);

app.use(passport.initialize());
app.use(passport.session());

const checkAuth = async (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return next(new AppError('AuthError', 401, 'Authentication required', true));
};

// db middleware
const checkDB = (req, res, next) => {
  if (mongoose.connection.readyState) {
    return next();
  }
  return next(new AppError('DBError', 500, 'Database connection failed', true));
};

// incoming request logger middleware
app.use((req, res, next) => {
  logger.info('Incoming request', req.path);
  next();
});

// app routes
app.use('/', checkDB, noauth);
app.use('/companies', checkAuth, companies);
app.use('/users', checkAuth, users);
app.use('/questions', checkAuth, questions);
app.use('/tests', checkAuth, tests);
app.use('/categories', checkAuth, categories);
app.use('/results', checkAuth, results);
app.use('/skills', checkAuth, skills);

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
