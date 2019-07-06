const mongoose = require('mongoose');

const logger = require('utils/logger');

const dbOptions = { useNewUrlParser: true };
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`, dbOptions)
  .then(() => logger.info('Successfully connected to database', 'mongoose'))
  .catch(err => logger.error(err.message, 'mongoose'));

module.exports = mongoose;
