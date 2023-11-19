const FuelRest = require('fuel-rest');
const logger = require('./logger');

// Required environment variables
const SFMC_MIDs = process.env.SFMC_MID.split(',');
const SFMC_TENANTs = process.env.SFMC_TENANT.split(',');
const SFMC_CLIENTs = process.env.SFMC_CLIENT.split(',');
const SFMC_SECRETs = process.env.SFMC_SECRET.split(',');

// Optional environment variable
const SFMC_LOG_DE = process.env.SFMC_LOG_DE ? process.env.SFMC_LOG_DE.split(',') : [];

// Default variables
let sfmcClients = [];
let sfmcLogDEs = [];

SFMC_MIDs.forEach((mid, key) => {
  // Connect to client(s)
  sfmcClients[`${mid}`] = new FuelRest({
    auth: {
      authOptions: {
        authVersion: 2,
        accountId: SFMC_MIDs[key]
      },
      clientId: SFMC_CLIENTs[key],
      clientSecret: SFMC_SECRETs[key],
      authUrl: `https://${SFMC_TENANTs[key]}.auth.marketingcloudapis.com/v2/token`
    }
  });

  sfmcLogDEs[`${mid}`] = SFMC_LOG_DE[key];

  // Test connection(s)
  sfmcClients[SFMC_MIDs[key]].get({ uri: '/platform/v1/tokenContext' }, (error, response) => {
    if (error) {
      logger.error(`[sfmc.js] mid: ${SFMC_MIDs[key]} | catch: ${JSON.stringify(error.res)}`);
    } else {
      logger.info(`[sfmc.js] mid: ${SFMC_MIDs[key]} | tokenContext: ${response.res.body}`);
    }
  });
});

module.exports = {
  logDE: (mid) => {
    return {
      externalKey: sfmcLogDEs[mid]
    }
  },
  getJourney: (mid, definitionId) => new Promise((resolve, reject) => {
    sfmcClients[`${mid}`].get({
      uri: `/interaction/v1/interactions/${definitionId}`,
      json: true
    }, (error, response) => {
      if (error) {
        reject(error);
      } else if (response.res.statusCode === 403 || response.res.statusCode === 400) {
        if (response.res.body === 'InteractionStudio') {
          reject({ message: 'Insufficient privileges to complete this action.' });
        } else {
          reject(response.res.body);
        }
      } else {
        resolve(response.body);
      }
    });
  }),
  postDataExtensionRows: (mid, deExternalKey, deRows) => new Promise((resolve, reject) => {
    sfmcClients[`${mid}`].post({
      uri: `/data/v1/async/dataextensions/key:${deExternalKey}/rows`,
      json: true,
      body: { items: deRows }
    }, (error, response) => {
      if (error) {
        reject(error);
      } else if (response.res.statusCode === 403 || response.res.statusCode === 400) {
        reject(response.res.body);
      } else {
        resolve(response.body);
      }
    });
  })
}
