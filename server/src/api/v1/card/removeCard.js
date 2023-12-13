'use strict';

const removeCard = require('../../../service/card/removeCard');

const USER_SECRET_HEADER = 'X-User-Secret';
const ROUTE_NAME = '/remove/:languageId';

module.exports = (app, logger, mysqlClient) => {
  app.put(ROUTE_NAME, async (req, res) => {
    try {
      const { languageId } = req.params;
      const { word } = req.body;
      const userSecret = req.header(USER_SECRET_HEADER);
      logger.debug(`removeCard router received a request for languageId: ${languageId} and word: ${JSON.stringify(word)}`);
      const wasSuccessful = await removeCard(logger, mysqlClient, userSecret, languageId, word);
      if (wasSuccessful) {
        res.status(200).json({success: true});
      } else {
        res.status(500).json({success: false});
      }
    } catch (err) {
      logger.error(err);
      res.status(500).json({success: false});
    }
  });
};
