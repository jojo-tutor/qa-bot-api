require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

// middlewares
const bodyParser = require('body-parser');

// local modules - routes
const companies = require('./services/company/route');
const users = require('./services/user/route');
const questions = require('./services/question/route');
const tests = require('./services/test/route');
const categories = require('./services/category/route');

// connect db
const dbOptions = { useNewUrlParser: true };
const { connection } = mongoose;
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`, dbOptions);
connection.on('error', () => console.error('Not connected!'));
connection.once('open', () => console.log('Connection successfull!'));

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('hello world!'));

app.use('/companies', companies);
app.use('/users', users);
app.use('/questions', questions);
app.use('/tests', tests);
app.use('/categories', categories);

module.exports = app;
