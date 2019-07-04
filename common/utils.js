const bcrypt = require('bcrypt');

const hashPassword = password => bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS, 10));

const generateToken = email => jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRY }); // eslint-disable-line

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
  getStatusCode,
};
