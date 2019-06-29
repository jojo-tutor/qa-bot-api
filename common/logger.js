const winston = require('winston');
require('winston-daily-rotate-file');

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json(),
  ),
  transports: [
    new (winston.transports.DailyRotateFile)({
      filename: 'logs/application-%DATE%.log',
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  ],
});

logger.error = (item) => {
  logger.log({ level: 'error', message: item instanceof Error ? item.stack : item });
};

module.exports = logger;
