const express = require('express');

// middlewares
const bodyParser = require('body-parser');

// // local modules
const companies = require('./services/company/route');
const users = require('./services/user/route');
const questions = require('./services/question/route');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('hello world!'));

app.use('/companies', companies);
app.use('/users', users);
app.use('/questions', questions);

module.exports = app;
