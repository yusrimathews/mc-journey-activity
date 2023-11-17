const logger = require('../lib/logger');

module.exports = (req, res) => {
  let statusCode, resultOutcome;

  try {
    logger.debug(`[publish.js] request: ${JSON.stringify({...req.query, ...req.body})}`);

    statusCode = 200;
    resultOutcome = 'Publish Success';
  } catch (error) {
    logger.error(`[publish.js] catch: ${JSON.stringify(error)}`);

    statusCode = 500;
    resultOutcome = 'Invalid Request';
  }

  res.status(statusCode).json({ result: resultOutcome });
}
