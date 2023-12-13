'use strict';

const getReviewCards = require('../../../service/card/getReviewCards');

const USER_SECRET_HEADER = 'X-User-Secret';
const ROUTE_NAME = '/review/:languageId';

module.exports = (app, logger, mysqlClient) => {
  app.post(ROUTE_NAME, async (req, res) => {
    try {
      const { languageId } = req.params;
      const { config } = req.body;
      const userSecret = req.header(USER_SECRET_HEADER);
      logger.debug(`getReviewCards router received a request for languageId: ${languageId} and config: ${config}`);
      const cards = await getReviewCards(logger, mysqlClient, userSecret, languageId, config);
      if (cards == null) {
        res.status(404).json({description: `No cards were found for languageId: ${languageId} and config: ${config}`});
      } else {
        res.status(200).json({cards: cards});
      }
    } catch (err) {
      logger.error(err);
      res.status(500).json({description: 'Server failure'});
    }
  });
};
