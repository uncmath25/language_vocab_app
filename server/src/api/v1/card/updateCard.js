'use strict';

const updateCard = require('../../../service/card/updateCard');

const USER_SECRET_HEADER = 'X-User-Secret';
const ROUTE_NAME = '/update/:languageId';

module.exports = (app, logger, mysqlClient) => {
  app.put(ROUTE_NAME, async (req, res) => {
    try {
      const { languageId } = req.params;
      const { card } = req.body;
      const userSecret = req.header(USER_SECRET_HEADER);
      logger.debug(`updateCard router received a request for languageId: ${languageId} and card: ${JSON.stringify(card)}`);
      const wasSuccessful = await updateCard(logger, mysqlClient, userSecret, languageId, card);
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
