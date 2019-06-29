const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// set environment variables
const envPath = path.resolve(process.cwd(), process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env');
require('dotenv').config({ path: envPath });

// local modules - routes
const noauth = require('./services/noauth/route');
const companies = require('./services/company/route');
const users = require('./services/user/route');
const questions = require('./services/question/route');
const tests = require('./services/test/route');
const categories = require('./services/category/route');
const results = require('./services/result/route');
const skills = require('./services/skill/route');

// local modules - utils
const { checkAuth } = require('./common/utils');

// db stuff
const dbOptions = { useNewUrlParser: true };
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`, dbOptions)
  .then(() => console.log('Successfully connected to database'))
  .catch(() => console.error('Database connection failed'));

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// auth middleware
const useAuth = async (req, res, next) => {
  const isValid = await checkAuth(req.headers.authorization);
  if (isValid) {
    return next();
  }
  return res.status(401).json({ error: 'Authentication failed.' });
};

// db middleware
const useDbCheck = (req, res, next) => {
  if (mongoose.connection.readyState) {
    return next();
  }
  console.error('Database connection failed');
  return res.status(500).json({ error: 'Database connection failed' });
};

app.use('/', useDbCheck, noauth);
app.use('/companies', useAuth, companies);
app.use('/users', useAuth, users);
app.use('/questions', useAuth, questions);
app.use('/tests', useAuth, tests);
app.use('/categories', useAuth, categories);
app.use('/results', useAuth, results);
app.use('/skills', useAuth, skills);

// endpoint not found
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found.' });
});

module.exports = app;
