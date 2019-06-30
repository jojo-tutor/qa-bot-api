const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const startCase = require('lodash/startCase');
const AppError = require('./error');

const hashPassword = password => bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS, 10));

const generateToken = email => jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRY }); // eslint-disable-line

const checkToken = async (token = '') => {
  try {
    const [, encoded = ''] = token.split(' ');
    const result = await jwt.verify(encoded, process.env.JWT_SECRET);
    return { result };
  } catch (error) {
    return { error: new AppError(error.name, 401, startCase(error.message), true) };
  }
};

const getStatusCode = (error) => {
  switch (error.name) {
    case 'CastError':
    case 'ValidationError':
    case 'MongoError':
      return 400;
    default:
      return isNaN(error.httpCode) ? 500 : parseInt(error.httpCode, 10);
  }
};

module.exports = {
  hashPassword,
  generateToken,
  checkToken,
  getStatusCode,
};
