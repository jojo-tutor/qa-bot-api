// set environment variables
import 'config/dotenv';

// modules
import express from 'express';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';

// local modules - logger
import logger from 'utils/logger';

// local modules - custom error
import AppError from 'utils/error';

// local modules - tools
import { getStatusCode } from 'utils/tools';

// local file - swagger
import swaggerDocument from 'docs/swagger';

// local file - middlewares
import { sessionMiddleware, authMiddleware } from 'common/middleware';

// local file - basic auth
import basicAuth from 'config/basicAuth';

// local file - passport
import passport from 'config/passport';

// local file - database
import database from 'config/database';

// local file - database
import setupUser from 'config/superAdmin';

// local modules - routes
import main from 'services/main/route';
import companies from 'services/company/route';
import users from 'services/user/route';
import questions from 'services/question/route';
import tests from 'services/test/route';
import categories from 'services/category/route';
import results from 'services/result/route';
import skills from 'services/skill/route';

// express
const app = express();

// mongoose
const mongoose = database({ onSuccess: setupUser });

// swagger
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, { showExplorer: true }));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// basic auth middleware
app.use(basicAuth);

// express session
app.use(sessionMiddleware);

// passport
app.use(passport.initialize());
app.use(passport.session());

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

export default app;
