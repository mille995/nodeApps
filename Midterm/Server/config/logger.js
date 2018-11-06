// winston losts messages to files or to the console
// transports configure separate loggers
// this exports 'logger'
// use logger.log in place of console.log

var winston = require('winston');
require('winston-daily-rotate-file');


// rotate log files so you don't have to clean up manually
require('winston-daily-rotate-file');  // does not require a variable because it is not called directly


const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        
        new (winston.transports.DailyRotateFile)({
            filename: 'log/application-%DATE%.log',
            datePattern: 'YYYY-MM-DD-HH',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d'
        })
    ]
});

// only log to the console when you are not running production
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