const mongodb = require('../lib/mongodb');
const logger = require('../lib/logger');

module.exports = (req, res) => {
  const mongodb_isEnabled = mongodb.isEnabled();

  try {
    logger.debug('[validate.js] success :', req.query, req.body);

    if (mongodb_isEnabled) {
      mongodb.insertDocuments('activity', 'validate', [{ ...req.query, ...req.body }])
        .then((response) => {
          logger.debug('[validate.js] mongodb success :', response);

          res.json({ success: true });
        });
    } else {
      res.json({ success: false });
    }
  } catch (error) {
    logger.error('[validate.js] error :', error);

    res.status(500).json({ error: true });
  }
}
