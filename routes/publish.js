const logger = require('../lib/logger');

module.exports = (req, res) => {
  let statusCode, resultOutcome;

  try {
    logger.debug(`[publish.js] mid: ${req.query.mid} | originalDefinitionId: ${req.body.originalDefinitionId} | activityObjectID: ${req.body.activityObjectID}`);

    statusCode = 200;
    resultOutcome = 'Publish Success';
  } catch (error) {
    logger.error(`[publish.js] catch: ${JSON.stringify(error)}`);

    statusCode = 500;
    resultOutcome = 'Invalid Request';
  }

  res
    .set({ 'Allow': 'POST' })
    .status(statusCode)
    .json({ result: resultOutcome });
}
