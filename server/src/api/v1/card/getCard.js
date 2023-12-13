'use strict';

const getCard = require('../../../service/card/getCard');

const USER_SECRET_HEADER = 'X-User-Secret';
const ROUTE_NAME = '/:languageId/:word';

module.exports = (app, logger, mysqlClient) => {
  app.get(ROUTE_NAME, async (req, res) => {
    try {
      const { languageId, word } = req.params;
      const userSecret = req.header(USER_SECRET_HEADER);
      logger.debug(`getCard router received a request for languageId: ${languageId} and word: ${word}`);
      const card = await getCard(logger, mysqlClient, userSecret, languageId, word);
      if (card == null) {
        res.status(404).json({exists: false, description: `No language name was found for languageId: ${languageId} and word: ${word}`});
      } else {
        res.status(200).json({exists: true, card: card});
      }
    } catch (err) {
      logger.error(err);
      res.status(500).json({description: 'Server failure'});
    }
  });
};
