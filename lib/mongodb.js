const { MongoClient } = require('mongodb');

// Optional environment variable
const MONGODB_CLIENT_URI = process.env.MONGODB_CLIENT_URI;

// Test connection
if (MONGODB_CLIENT_URI) {
  const client = new MongoClient(MONGODB_CLIENT_URI);
  
  try {
    client.connect();
  } catch (error) {
    console.log(error);
  } finally {
    client.close();
  }
}
