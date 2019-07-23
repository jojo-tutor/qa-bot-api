import cors from 'cors';

// local modules - custom error
const AppError = require('utils/error');

// white listed domains: applied except in development
const whitelist = process.env.CORS_WHITELIST;

// only allow CORS on development: all, production: whitelist
const corsDelegate = (req, callback) => {
  const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
  let options = { origin: false };
  let error = null;

  if (isDevelopment || whitelist.includes(req.headers.host)) {
    options = { origin: true };
  } else {
    error = new AppError('CORS', 403, `Not allowed by CORS. Host Origin: ${req.headers.host}`, true);
  }

  callback(error, options);
};

module.exports = () => cors(corsDelegate);
