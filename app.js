require('dotenv').config();

const express = require('express');
const app = express();
const logger = require('./lib/logger');
const cors = require('cors');
const helmet = require('helmet');
const treblle = require('@treblle/express');
const history = require('connect-history-api-fallback');

// Optional environment variables
const PORT = process.env.PORT || 8081;
const NODE_ENV = process.env.NODE_ENV || 'development';
const NODE_VERSION = process.env.NODE_VERSION || '18.15.0';
const TREBLLE_PROJECT = process.env.TREBLLE_PROJECT;
const TREBLLE_KEY = process.env.TREBLLE_KEY;

// Configure middleware & parsers
app.use(cors());
app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginResourcePolicy: false,
  xFrameOptions: false
}));
app.use(express.json());

if (TREBLLE_PROJECT && TREBLLE_KEY) {
  app.use(['/validate', '/publish', '/execute'], treblle({
    apiKey: TREBLLE_KEY,
    projectId: TREBLLE_PROJECT
  }));
}

// Configure server routes
app.get('/config.json', require('./routes/config'));
app.post('/validate', require('./routes/validate'));
app.post('/publish', require('./routes/publish'));
app.post('/execute', require('./routes/execute'));

// Configure client route
app.use(history());
app.use(express.static(`${__dirname}/dist/`));

// Start server
app.listen(PORT, (error) => {
  if (error) {
    logger.error(`[app.js] catch: ${JSON.stringify(error)}`);
  } else {
    logger.info(`[app.js] port: ${PORT} | node_env: ${NODE_ENV} | node_version: ${NODE_VERSION}`);
  }
});
