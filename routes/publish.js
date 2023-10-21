const mongodb = require('../lib/mongodb');
const logger = require('../lib/logger');

module.exports = (req, res) => {
  const mongodbIsEnabled = mongodb.isEnabled();
  const timestampUTC = new Date().toUTCString();

  let statusCode, resultOutcome, resultCatch;

  try {
    logger.debug(`[publish.js] request: ${JSON.stringify({...req.query, ...req.body})}`);

    statusCode = 200;
    resultOutcome = 'Publish Success';
  } catch (error) {
    logger.error(`[publish.js] catch: ${JSON.stringify(error)}`);

    statusCode = 500;
    resultOutcome = 'Invalid Request';
    resultCatch = error;
  }

  if (mongodbIsEnabled) {
    mongodb.insertDocuments('activity', 'publish', [{
      ...req.query,
      ...req.body,
      statusCode,
      resultOutcome,
      resultCatch,
      timestamp: timestampUTC
    }])
      .then((response) => {
        logger.debug(`[publish.js] mongodb: ${JSON.stringify(response)}`);
      })
      .catch((error) => {
        logger.error(`[publish.js] mongodb: ${JSON.stringify(error)}`);
      });
  }

  res.status(statusCode).json({ result: resultOutcome });
}
