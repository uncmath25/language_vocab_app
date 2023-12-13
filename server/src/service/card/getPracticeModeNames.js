'use strict';

module.exports = async (logger, mysqlClient) => {
  logger.debug(`getPracticeModeNames service is building a map with all practice mode names`);
  return await mysqlClient.getPracticeModeNames();
};
