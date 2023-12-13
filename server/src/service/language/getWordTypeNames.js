'use strict';

module.exports = async (logger, mysqlClient) => {
  logger.debug(`getWordTypeNames service is building a map with all word type names`);
  return await mysqlClient.getWordTypeNames();
};
