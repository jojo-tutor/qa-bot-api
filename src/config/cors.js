import cors from 'cors';

// local modules - custom error
const AppError = require('utils/error');

// white listed domains: applied except in development
const whitelist = ['https://qa-bot.com'];

// only allow CORS on development: all, production: whitelist
export const corsDelegate = (req, callback) => {
  const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
  let options = { origin: false };
  let error = null;

  if (isDevelopment || whitelist.includes(req.header('Origin'))) {
    options = { origin: true };
  } else {
    error = new AppError('CORS', 403, 'Not allowed by CORS', true);
  }

  callback(error, options);
};

export default () => cors(corsDelegate);
