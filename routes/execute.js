const logger = require('../lib/logger');
const sfmc = require('../lib/sfmc');

module.exports = async (req, res) => {
  let statusCode, jsonResult;

  try {
    if (!req.query.mid) throw('Invalid Request - Missing Required Parameters');

    const timestampUTC = new Date().toUTCString();
    const sfmcLogDE = sfmc.logDE(req.query.mid);

    if (sfmcLogDE.externalKey) {
      await sfmc.postDataExtensionRows(req.query.mid, sfmcLogDE.externalKey, [{
        ...req.query,
        ...req.body,
        timestamp: timestampUTC,
        inArguments: JSON.stringify(req.body.inArguments)
      }])
        .then((response) => {
          logger.debug(`[execute.js] postDataExtensionRows: ${JSON.stringify(response)}`);
        });
    }

    logger.debug(`[execute.js] mid: ${req.query.mid} | originalDefinitionId: ${req.body.originalDefinitionId} | activityObjectID: ${req.body.activityObjectID}`);

    statusCode = 200;
    jsonResult = 'Execution Success';
  } catch (error) {
    logger.error(`[execute.js] catch: ${JSON.stringify(error)}`);

    statusCode = 500;
    jsonResult = 'Invalid Request';
  }

  res.status(statusCode).json({ result: jsonResult });
}
