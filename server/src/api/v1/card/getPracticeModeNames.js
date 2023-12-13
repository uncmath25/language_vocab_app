'use strict';

const getPracticeModeNames = require('../../../service/card/getPracticeModeNames');

const ROUTE_NAME = '/practiceModeNames';

module.exports = (app, logger, mysqlClient) => {
  app.get(ROUTE_NAME, async (req, res) => {
    try {
      logger.debug(`getPracticeModeNames router received a request for all practice mode names`);
      const practiceModeNamesMap = await getPracticeModeNames(logger, mysqlClient);
      res.status(200).json({practiceModeNamesMap: practiceModeNamesMap});
    } catch (err) {
      logger.error(err);
      res.status(500).json({description: 'Server failure'});
    }
  });
};
