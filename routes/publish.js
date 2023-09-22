const mongodb = require('../lib/mongodb');
const logger = require('../lib/logger');

module.exports = (req, res) => {
  try {
    logger.info('[publish.js] success :', req.body);

    res.json({ success: true });
  } catch (error) {
    logger.error('[publish.js] error :', error);

    res.status(500).json({ error: true });
  }
}
