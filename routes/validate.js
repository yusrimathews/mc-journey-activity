const logger = require('../lib/logger');

module.exports = (req, res) => {
  try {
    logger.info('[validate.js] success :', req.body);
    
    res.json({ success: true });
  } catch (error) {
    logger.error('[validate.js] error :', error);

    res.status(500).json({ error: true });
  }
}
