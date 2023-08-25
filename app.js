const express = require('express');
const cors = require('cors');
const history = require('connect-history-api-fallback');
const app = express();

// Configure parsers
app.use(cors());
app.use(history());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require('body-parser').raw({
  type: 'application/jwt'
}));

// Configure headers
app.use(function (req, res, next) {
  res.set('Cache-control', 'no-store');
  res.set('Pragma', 'no-cache');
  next();
});
app.disable('x-powered-by');

// Configure routes
app.get('/config.json', require('./routes/config-json'));
app.get('/execute', require('./routes/execute'));
app.get('/publish', require('./routes/publish'));

// Configure routes to static files
app.use(express.static(`${__dirname}/dist/`));

// Start server
const port = process.env.PORT || 8081;

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
});
