const { MongoClient } = require('mongodb');
const logger = require('./logger');

// Optional environment variable
const MONGODB_CLIENT = process.env.MONGODB_CLIENT;

// Default variables
let mongodbEnabled = MONGODB_CLIENT ? true : false;
let mongodbClient = {};

if (mongodbEnabled) {
  // Connect to client
  mongodbClient = new MongoClient(MONGODB_CLIENT);

  // Test connection
  mongodbClient.connect()
    .then((response) => {
      logger.info(`[mongodb.js] url: ${response.s.url}`);
    })
    .catch((error) => {
      logger.error(`[mongodb.js] catch: ${JSON.stringify(error)}`);
    });
}

module.exports = {
  isEnabled: () => {
    return mongodbEnabled;
  },
  insertDocuments: (dbName, collectionName, documents) => new Promise((resolve, reject) => {
    try {
      resolve(mongodbClient.db(dbName).collection(collectionName).insertMany(documents));
    } catch (error) {
      reject(error);
    }
  })
}
