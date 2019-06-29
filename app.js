require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

// middlewares
const bodyParser = require('body-parser');

// local modules - routes
const noauth = require('./services/noauth/route');
const companies = require('./services/company/route');
const users = require('./services/user/route');
const questions = require('./services/question/route');
const tests = require('./services/test/route');
const categories = require('./services/category/route');
const results = require('./services/result/route');
const skills = require('./services/skill/route');

// utils
const { checkAuth } = require('./common/utils');

// connect db
const dbOptions = { useNewUrlParser: true };
const { connection } = mongoose;
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`, dbOptions);
connection.on('error', () => console.error('Not connected!'));
connection.once('open', () => console.log('Connection successfull!'));

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
  return res.status(401).json({ error: 'Unauthorized.' });
};

app.use('/', noauth);
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
