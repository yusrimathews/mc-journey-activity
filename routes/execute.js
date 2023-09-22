const logger = require('../lib/logger');

module.exports = (req, res) => {
  try {
    logger.info('[execute.js] success :', req.body);

    res.json({ success: true });
  } catch (error) {
    logger.error('[execute.js] error :', error);

    res.status(500).json({ error: true });
  }
}
