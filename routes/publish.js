const logger = require('../lib/logger');

module.exports = (req, res) => {
  let statusCode, jsonResult;

  try {
    logger.debug(`[publish.js] mid: ${req.query.mid} | originalDefinitionId: ${req.body.originalDefinitionId} | activityObjectID: ${req.body.activityObjectID}`);

    statusCode = 200;
    jsonResult = 'Publish Success';
  } catch (error) {
    logger.error(`[publish.js] catch: ${JSON.stringify(error)}`);

    statusCode = 500;
    jsonResult = 'Invalid Request';
  }

  res.status(statusCode).json({ result: jsonResult });
}
