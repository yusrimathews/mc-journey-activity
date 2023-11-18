require('dotenv').config();

const express = require('express');
const app = express();
const logger = require('./lib/logger');
const cors = require('cors');
const helmet = require('helmet');
const { useTreblle } = require('treblle');
const { rateLimit } = require('express-rate-limit');
const history = require('connect-history-api-fallback');

// Optional environment variables
const PORT = process.env.PORT || 8081;
const NOVE_ENV = process.env.NODE_ENV || 'local';
const NODE_VERSION = process.env.NODE_VERSION || '18.15.0';
const TREBLLE_PROJECT = process.env.TREBLLE_PROJECT;
const TREBLLE_KEY = process.env.TREBLLE_KEY;

// Configure middleware & parsers
app.use(cors());
app.use(helmet({
  contentSecurityPolicy: false,
  xFrameOptions: false
}));
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

if (TREBLLE_PROJECT && TREBLLE_KEY) {
  useTreblle(app, {
    projectId: TREBLLE_PROJECT,
    apiKey: TREBLLE_KEY
  });
}

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 15000,
	standardHeaders: false,
	legacyHeaders: true
});

app.use(limiter);

// Configure server routes
app.get('/config.json', require('./routes/config'));
app.post('/execute', require('./routes/execute'));
app.post('/publish', require('./routes/publish'));
app.post('/validate', require('./routes/validate'));

// Configure client route
app.use(history());
app.use(express.static(`${__dirname}/dist/`));

// Start server
app.listen(PORT, (error) => {
  if (error) {
    logger.error(`[app.js] catch: ${JSON.stringify(error)}`);
  } else {
    logger.info(`[app.js] port: ${PORT} | node_env: ${NOVE_ENV} | node_version: ${NODE_VERSION}`);
  }
});
