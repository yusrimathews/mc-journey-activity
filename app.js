require('dotenv').config();

const express = require('express');
const app = express();
const logger = require('./lib/logger');

// Optional environment variables
const port = process.env.PORT || 8081;

// Configure middleware & parsers
app.use(require('cors'));
app.use(require('connect-history-api-fallback'));
app.use(require('nocache'));
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
    logger.error('[app.js] error :', error);
  } else {
    logger.info(`[app.js] success : ${port}`);
  }
});
