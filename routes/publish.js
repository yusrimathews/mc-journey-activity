const mongodb = require('../lib/mongodb');
const logger = require('../lib/logger');

module.exports = (req, res) => {
  const mongodb_isEnabled = mongodb.isEnabled();

  try {
    logger.debug('[publish.js] success :', req.query, req.body);

    if (mongodb_isEnabled) {
      mongodb.insertDocuments('activity', 'publish', [{ ...req.query, ...req.body }])
        .then((response) => {
          logger.debug('[publish.js] mongodb success :', response);

          res.json({ success: true });
        });
    } else {
      res.json({ success: false });
    }
  } catch (error) {
    logger.error('[publish.js] error :', error);

    res.status(500).json({ error: true });
  }
}
