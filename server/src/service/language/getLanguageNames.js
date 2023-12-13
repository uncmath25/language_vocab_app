'use strict';

module.exports = async (logger, mysqlClient) => {
  logger.debug(`getLanguageNames service is building a map with all language names`);
  return await mysqlClient.getLanguageNames();
};
