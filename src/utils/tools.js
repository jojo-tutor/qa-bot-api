const bcrypt = require('bcrypt');

const hashPassword = password => bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS, 10));

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
  getStatusCode,
};
