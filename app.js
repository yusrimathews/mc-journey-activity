require('dotenv').config();

const express = require('express');
const app = express();
const logger = require('./lib/logger');
const cors = require('cors');
const helmet = require('helmet');
const { useTreblle } = require('treblle');
const history = require('connect-history-api-fallback');

// Optional environment variables
const port = process.env.PORT || 8081;
const env = process.env.NODE_ENV || 'local';
const version = process.env.NODE_VERSION || '18.15.0';

// Configure middleware & parsers
app.use(cors());
app.use(helmet({
  contentSecurityPolicy: {
    directives: { 'frame-ancestors': ["'self'", "https://*.exacttarget.com/"] }
  }
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

useTreblle(app, {
  projectId: process.env.TREBLLE_PROJECT,
  apiKey: process.env.TREBLLE_KEY
});

// Configure server routes
app.get('/config.json', require('./routes/config'));
app.post('/execute', require('./routes/execute'));
app.post('/publish', require('./routes/publish'));
app.post('/validate', require('./routes/validate'));

// Configure client route
app.use(history());
app.use(express.static(`${__dirname}/dist/`));

// Start server
app.listen(port, (error) => {
  if (error) {
    logger.error(`[app.js] catch: ${JSON.stringify(error)}`);
  } else {
    logger.info(`[app.js] port: ${port} | node_env: ${env} | node_version: ${version}`);
  }
});
