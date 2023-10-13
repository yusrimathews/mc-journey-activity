const { MongoClient, ServerApiVersion } = require('mongodb');
const logger = require('./logger');

// Optional environment variable
const MONGODB_CLIENT = process.env.MONGODB_CLIENT;

// Conditional MongoDB client variable
var mongodbEnabled = MONGODB_CLIENT ? true : false;
var mongodbClient = {};

if (MONGODB_CLIENT) {
  // Connect to client
  mongodbClient = new MongoClient(MONGODB_CLIENT, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true
    }
  });

  // Test connection
  try {
    mongodbClient.connect();
    mongodbClient.db('admin').command({ ping: 1 });

    logger.info('[mongodb.js] success');
  } catch (error) {
    logger.error('[mongodb.js] error :', error);
  }
}

module.exports = {
  isEnabled: () => {
    return mongodbEnabled;
  },
  insertDocuments: (dbName, collectionName, documents) => new Promise((resolve, reject) => {
    const database = mongodbClient.db(dbName);
    const collection = database.collection(collectionName);

    try {
      resolve(collection.insertMany(documents));
    } catch (error) {
      reject(error);
    }
  })
}
