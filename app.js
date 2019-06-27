const express = require('express');

// middlewares
const bodyParser = require('body-parser');

// local modules
const questionsRouter = require('./src/routes/questions');

const app = express();
const PORT = 3000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('hello world!'));

app.use('/questions', questionsRouter);

app.listen(PORT, () => console.log(`@ Listening on port ${PORT}`));
