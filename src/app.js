// local file - cors
import cors from 'config/cors';

// set environment variables
const envPath = require('path').resolve(process.cwd(), process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env');
require('dotenv').config({ path: envPath });

const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');

// local modules - logger
const logger = require('utils/logger');

// local modules - custom error
const AppError = require('utils/error');

// local modules - tools
const { getStatusCode } = require('utils/tools');

// local file - swagger
const swaggerDocument = require('docs/swagger.json');

// local file - middlewares
const { sessionMiddleware, authMiddleware } = require('common/middleware');

// local file - passport
const passport = require('config/passport');

// local file - mongoose
const mongoose = require('config/mongoose');

// local modules - routes
const main = require('services/main/route');
const companies = require('services/company/route');
const users = require('services/user/route');
const questions = require('services/question/route');
const tests = require('services/test/route');
const categories = require('services/category/route');
const results = require('services/result/route');
const skills = require('services/skill/route');

// express
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// express session
app.use(sessionMiddleware);

// passport
app.use(passport.initialize());
app.use(passport.session());

// cors
app.use(cors());

// db middleware
const checkDBStatus = (req, res, next) => {
  if (mongoose.connection.readyState) {
    return next();
  }
  return next(new AppError('DBError', 500, 'Database connection failed', true));
};

// incoming request logger middleware
app.use((req, res, next) => {
  logger.info('Incoming request', req.path);
  logger.info(`Request body ${JSON.stringify(req.body)}`, req.path);
  next();
});

// app routes
app.use('/', checkDBStatus, main);
app.use('/companies', authMiddleware, companies);
app.use('/users', authMiddleware, users);
app.use('/questions', authMiddleware, questions);
app.use('/tests', authMiddleware, tests);
app.use('/categories', authMiddleware, categories);
app.use('/results', authMiddleware, results);
app.use('/skills', authMiddleware, skills);

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
