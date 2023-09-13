const { MongoClient } = require('mongodb');
const logger = require('./logger');

// Optional environment variable
const MONGODB_CLIENT_URI = process.env.MONGODB_CLIENT_URI;

// Test connection
if (MONGODB_CLIENT_URI) {
  const client = new MongoClient(MONGODB_CLIENT_URI);
  
  try {
    client.connect();

    logger.debug(`[mongodb.js] ${JSON.stringify(client)}`);
  } catch (error) {
    logger.error(`[mongodb.js] ${JSON.stringify(error)}`);
  } finally {
    client.close();
  }
}
