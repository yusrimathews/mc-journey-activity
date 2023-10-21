const mongodb = require('../lib/mongodb');
const logger = require('../lib/logger');
const sfmc = require('../lib/sfmc');

module.exports = async (req, res) => {
  const mongodbIsEnabled = mongodb.isEnabled();
  const timestampUTC = new Date().toUTCString();

  let statusCode, resultOutcome, resultCatch;

  try {
    logger.debug(`[execute.js] request: ${JSON.stringify({...req.query, ...req.body})}`);

    if (!req.query.mid) throw('Invalid Request - Missing Required Parameters');

    const sfmcLogDE = sfmc.logDE(req.query.mid);

    if (sfmcLogDE.isEnabled) {
      await sfmc.postDataExtensionRows(req.query.mid, sfmcLogDE.externalKey, [{
        ...req.query,
        ...req.body,
        timestamp: timestampUTC,
        inArguments: JSON.stringify(req.body.inArguments)
      }])
        .then((response) => {
          logger.debug(`[execute.js] mid: ${req.query.mid} | externalKey: ${sfmcLogDE.externalKey}`);
          logger.debug(`[execute.js] postDataExtensionRows: ${JSON.stringify(response)}`);
        });
    }

    statusCode = 200;
    resultOutcome = 'Execution Success';
  } catch (error) {
    logger.error(`[execute.js] catch: ${JSON.stringify(error)}`);

    statusCode = 500;
    resultOutcome = 'Invalid Request';
    resultCatch = error;
  }

  if (mongodbIsEnabled) {
    mongodb.insertDocuments('activity', 'execute', [{
      ...req.query,
      ...req.body,
      statusCode,
      resultOutcome,
      resultCatch,
      timestamp: timestampUTC
    }])
      .then((response) => {
        logger.debug(`[execute.js] mongodb: ${JSON.stringify(response)}`);
      })
      .catch((error) => {
        logger.error(`[execute.js] mongodb: ${JSON.stringify(error)}`);
      });
  }

  res.status(statusCode).json({ result: resultOutcome });
}
