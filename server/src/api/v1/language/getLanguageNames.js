'use strict';

const getLanguageNames = require('../../../service/language/getLanguageNames');

const ROUTE_NAME = '/names';

module.exports = (app, logger, mysqlClient) => {
  app.get(ROUTE_NAME, async (req, res) => {
    try {
      logger.debug(`getLanguageNames router received a request for all language names`);
      const languageNamesMap = await getLanguageNames(logger, mysqlClient);
      res.status(200).json({languageNamesMap: languageNamesMap});
    } catch (err) {
      logger.error(err);
      res.status(500).json({description: 'Server failure'});
    }
  });
};
