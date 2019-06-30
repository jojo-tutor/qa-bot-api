const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const hashPassword = password => bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS, 10));

const checkAuth = async (token) => {
  try {
    const [, encoded] = token.split(' ');
    const decoded = await jwt.verify(encoded, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    return false;
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
  checkAuth,
  getStatusCode,
};
