require('dotenv').config();

const express = require('express');
const app = express();
const logger = require('./lib/logger');
const cors = require('cors');
const history = require('connect-history-api-fallback');
const nocache = require('nocache');

// Optional environment variables
const port = process.env.PORT || 8081;

// Configure middleware & parsers
app.use(cors());
app.use(history());
app.use(nocache());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require('body-parser').raw({
  type: 'application/jwt'
}));
app.disable('x-powered-by');

// Configure server routes
app.get('/config.json', require('./routes/config'));
app.post('/execute', require('./routes/execute'));
app.post('/publish', require('./routes/publish'));
app.post('/validate', require('./routes/validate'));

// Configure client route
app.use(express.static(`${__dirname}/dist/`));

// Start server
app.listen(port, (error) => {
  if (error) {
    logger.error(`[app.js] catch: ${JSON.stringify(error)}`);
  } else {
    logger.info(`[app.js] port: ${port}`);
  }
});
