const logger = require('../lib/logger');

module.exports = (req, res) => {
  try {
    logger.info(`[validate.js] ${JSON.stringify(req)}`);

    res.json({ success: true });
  } catch (error) {
    logger.error(`[validate.js] ${JSON.stringify(error)}`);

    res.status(500).json({ error: true });
  }
}
