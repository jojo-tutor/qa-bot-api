const winston = require('winston');

const { format, transports } = winston;
require('winston-daily-rotate-file');

const logger = winston.createLogger({
  format: format.combine(
    format.colorize(),
    format.json(),
  ),
  transports: [
    new (transports.DailyRotateFile)({
      filename: 'logs/application-%DATE%.log',
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
    new transports.Console({
      format: format.simple(),
    }),
  ],
});

logger.error = (error) => {
  logger.log({ level: 'error', message: error.stack });
};

module.exports = logger;
