const { MongoClient, ServerApiVersion } = require('mongodb');
const logger = require('./logger');

// Optional environment variable
const MONGODB_CLIENT = process.env.MONGODB_CLIENT;

if (MONGODB_CLIENT) {
  const client = new MongoClient(MONGODB_CLIENT, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true
    }
  });

  // Test connection
  async function init() {
    try {
      await client.connect();
      await client.db('admin').command({ ping: 1 });

      logger.debug('[mongodb.js] init');
    } finally {
      await client.close();
    }
  }

  init().catch(console.dir);
}
