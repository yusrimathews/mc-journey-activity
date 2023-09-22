const { createLogger, format, transports } = require('winston');
const path = require('path');

const logger = createLogger({
  level: 'debug',
  format: format.combine(
    format.colorize(),
    format.splat(),
    format.simple()
  ),
  transports: [new transports.Console()]
});

module.exports = logger;
