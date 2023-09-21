const mongodb = require('../lib/mongodb');
const logger = require('../lib/logger');

module.exports = (req, res) => {
  try {
    logger.info(`[publish.js] ${JSON.stringify(req)}`);

    res.json({ success: true });
  } catch (error) {
    logger.error(`[publish.js] ${JSON.stringify(error)}`);

    res.status(500).json({ error: true });
  }
}
