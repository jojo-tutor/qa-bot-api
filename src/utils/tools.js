import cryptoRandomString from 'crypto-random-string';
import bcrypt from 'bcrypt';

export const hashPassword = password => bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS, 10)); // eslint-disable-line

export const generateToken = () => cryptoRandomString({ length: Number(process.env.TOKEN_LENGTH), type: 'url-safe' });

export const getStatusCode = (error) => {
  switch (error.name) {
    case 'CastError':
    case 'ValidationError':
    case 'MongoError':
      return 400;
    default:
      return isNaN(error.httpCode) ? 500 : parseInt(error.httpCode, 10);
  }
};
