import winston from 'winston';
import 'winston-daily-rotate-file';

const { format, transports } = winston;

const consoleLogFormat = format.printf(({
  level, message, source = 'server', timestamp,
}) => `${timestamp} [${source}] ${level}: ${message}`);

const logger = winston.createLogger({
  format: format.combine(
    format.json(),
    format.colorize(),
    format.timestamp(),
  ),
  transports: [
    new (transports.DailyRotateFile)({
      filename: 'logs/application-%DATE%.log',
      datePattern: 'YYYY-MM-DD-HH',
      json: true,
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.timestamp(),
        consoleLogFormat,
      ),
    }),
  ],
});

logger.info = (info, source = 'server') => {
  logger.log({ level: 'info', message: info, source });
};

logger.error = (error, source = 'server') => {
  const message = (error && typeof error === 'object') ? error.stack : error;
  logger.log({ level: 'error', message, source });
};

export default logger;
