import auth from 'basic-auth';
import compare from 'tsscmp';

// local modules - custom error
import AppError from 'utils/error';

const isValid = (name, pass) => {
  let valid = true;

  // Simple method to prevent short-circut and use timing-safe compare
  valid = compare(name, process.env.AUTH_USER) && valid;
  valid = compare(pass, process.env.AUTH_PASSWORD) && valid;

  return valid;
};

const authMiddleware = (req, res, next) => {
  const credentials = auth(req);

  if (!credentials || !isValid(credentials.name, credentials.pass)) {
    return next(new AppError('AuthError', 401, 'Authorization required', true));
  }

  return next();
};


export default authMiddleware;
