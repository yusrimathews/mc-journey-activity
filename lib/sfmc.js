const FuelRest = require('fuel-rest');
const logger = require('./logger');

// Optional environment variables
const SFMC_MIDs = process.env.SFMC_MID.split(',');
const SFMC_CLIENTs = process.env.SFMC_CLIENT.split(',');
const SFMC_SECRETs = process.env.SFMC_SECRET.split(',');
const SFMC_TENANTs = process.env.SFMC_TENANT.split(',');

const restClients = [];

SFMC_MIDs.forEach((mid, i) => {
  const sdkOptions = {
    auth: {
      authOptions: {
        authVersion: 2,
        accountId: SFMC_MIDs[i]
      },
      clientId: SFMC_CLIENTs[i],
      clientSecret: SFMC_SECRETs[i],
      authUrl: `https://${SFMC_TENANTs[i]}.auth.marketingcloudapis.com/v2/token`
    }
  }

  try {
    restClients[`${mid}`] = new FuelRest(sdkOptions);
  } catch (error) {
    logger.error(`[sfmc.js] ${SFMC_MIDs[i]} :`, error);
  }

  // Test connection
  restClients[SFMC_MIDs[i]].get({ uri: '/platform/v1/tokenContext' }, (error, response) => {
    if (error) {
      logger.error(`[sfmc.js] ${SFMC_MIDs[i]} :`, error);
    } else {
      logger.debug(`[sfmc.js] ${SFMC_MIDs[i]} :`, response.body);
    }
  });
});

module.exports = {
  getJourney: (mid, definitionId) => new Promise((resolve, reject) => {
    const requestOptions = {
      uri: `/interaction/v1/interactions/${definitionId}`,
      json: true
    }

    restClients[`${mid}`].get(requestOptions, (error, response) => {
      if (error) {
        logger.error(`[sfmc.js] ${mid} :`, error);

        reject(error);
      } else {
        logger.debug(`[sfmc.js] ${mid} :`, response.body);

        resolve(response.body);
      }
    });
  }),
  postDataExtensionRows: (mid, deExternalKey, items) => new Promise((resolve, reject) => {
    const requestOptions = {
      uri: `/data/v1/async/dataextensions/key:${deExternalKey}/rows`,
      json: true,
      body: {
        items
      }
    }

    restClients[`${mid}`].post(requestOptions, (error, response) => {
      if (error) {
        logger.error(`[sfmc.js] ${mid} :`, error);

        reject(error);
      } else {
        logger.debug(`[sfmc.js] ${mid} :`, response.body);

        resolve(response.body);
      }
    });
  })
}
