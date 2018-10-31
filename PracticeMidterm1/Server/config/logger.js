// winston logs messages to files or to the console
// transports configure separate loggers
// this exports 'logger'
// use logger.log in place of console.log

var winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
  });

  if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
    format: winston.format.combine(
    winston.format.colorize(),
    winston.format.splat(),
    winston.format.simple()
        )
    }));
    }

    module.exports = logger;
    