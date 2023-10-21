const mongodb = require('../lib/mongodb');
const logger = require('../lib/logger');
const sfmc = require('../lib/sfmc');

module.exports = async (req, res) => {
  const mongodbIsEnabled = mongodb.isEnabled();
  const timestampUTC = new Date().toUTCString();

  let statusCode, resultOutcome, resultCatch;

  try {
    logger.debug(`[validate.js] request: ${JSON.stringify({...req.query, ...req.body})}`);

    if (!req.query.mid || !req.body.interactionId || !req.body.activityObjectID) throw('Invalid Request - Missing Required Parameters');

    const sfmcGetJourney = await sfmc.getJourney(req.query.mid, req.body.interactionId);
    const jbActivities = sfmcGetJourney.activities;
    const jbActivity = jbActivities ? jbActivities.find(activity => activity.id === req.body.activityObjectID) : false;
    const jbTriggers = sfmcGetJourney.triggers;
    const jbTrigger = jbTriggers[0];
    const jbTriggerEventDefinitionKey = jbTrigger.metaData.eventDefinitionKey;

    let contactBindingValues = [], contactBindingError = false, contactBindingErrors = [];

    if (jbActivity) {
      const jbInArguments = jbActivity.arguments.execute.inArguments;
      // const jbInArguments = require('../src/data/jbInArguments');

      jbInArguments.forEach((argument) => {
        var contactBindingRegex = /\{\{(.*?)\}\}/g;

        for (const key in argument) {
          if (argument.hasOwnProperty(key)) {
            var matches = argument[key].match(contactBindingRegex);

            if (matches) {
              contactBindingValues.push(...matches);
            }
          }
        }
      });

      contactBindingValues.forEach((value) => {
        var contactBindingValidation = /^{{Event\.(.*?)}}/;

        if (contactBindingValidation.test(value) && value.search(jbTriggerEventDefinitionKey) < 0) {
          contactBindingError = true;
          contactBindingErrors.push(value);
        }
      });
    }

    if (!jbActivity) {
      logger.error(`[validate.js] mid: ${req.query.mid} | invalidActivityObjectID: ${req.body.activityObjectID}`);
      logger.error(`[validate.js] jbActivities: ${JSON.stringify(jbActivities)}`);

      statusCode = 400;
      resultOutcome = 'Validation Failed due to invalid Activity ID';
      resultCatch = {
        jbActivities,
        activityObjectID: req.body.activityObjectID
      }
    } else if (contactBindingError) {
      logger.error(`[validate.js] mid: ${req.query.mid} | contactBindingErrors: ${JSON.stringify(contactBindingErrors)}`);
      logger.error(`[validate.js] jbTriggerEventDefinitionKey: ${jbTriggerEventDefinitionKey}`);

      statusCode = 400;
      resultOutcome = 'Validation Failed due to Contact Binding';
      resultCatch = {
        contactBindingErrors,
        jbTriggerEventDefinitionKey
      }
    } else {
      logger.debug(`[validate.js] mid: ${req.query.mid} | interactionId: ${req.body.interactionId} | activityObjectID: ${req.body.activityObjectID}`);
      logger.debug(`[validate.js] getJourney: ${JSON.stringify(sfmcGetJourney)}`);

      statusCode = 200;
      resultOutcome = 'Validation Success';
    }
  } catch (error) {
    logger.error(`[validate.js] catch: ${JSON.stringify(error)}`);

    statusCode = 500;
    resultOutcome = 'Invalid Request';
    resultCatch = error;
  }

  if (mongodbIsEnabled) {
    mongodb.insertDocuments('activity', 'validate', [{
      ...req.query,
      ...req.body,
      statusCode,
      resultOutcome,
      resultCatch,
      timestamp: timestampUTC
    }])
      .then((response) => {
        logger.debug(`[validate.js] mongodb: ${JSON.stringify(response)}`);
      })
      .catch((error) => {
        logger.error(`[validate.js] mongodb: ${JSON.stringify(error)}`);
      });
  }

  res.status(statusCode).json({ result: resultOutcome });
}
