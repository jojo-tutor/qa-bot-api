import cryptoRandomString from 'crypto-random-string';
import bcrypt from 'bcrypt';

import AppError from 'utils/error';

export const hashPassword = (password) => {
  if (!password) {
    return Promise.reject(new AppError('HashError', 500, 'Password is required', true));
  }
  return bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS, 10));
};

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
