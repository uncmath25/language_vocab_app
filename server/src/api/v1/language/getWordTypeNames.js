'use strict';

const getWordTypeNames = require('../../../service/language/getWordTypeNames');

const ROUTE_NAME = '/wordTypeNames';

module.exports = (app, logger, mysqlClient) => {
  app.get(ROUTE_NAME, async (req, res) => {
    try {
      logger.debug(`getWordTypeNames router received a request for all word type names`);
      const wordTypeNamesMap = await getWordTypeNames(logger, mysqlClient);
      res.status(200).json({wordTypeNamesMap: wordTypeNamesMap});
    } catch (err) {
      logger.error(err);
      res.status(500).json({description: 'Server failure'});
    }
  });
};
