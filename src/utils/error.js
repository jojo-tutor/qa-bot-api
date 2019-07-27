function AppError(name, httpCode, message, isOperational) {
  Error.captureStackTrace(this, this.constructor);
  this.name = name || this.constructor.name;
  this.httpCode = httpCode;
  this.message = message;
  this.isOperational = isOperational;
}

export default AppError;
