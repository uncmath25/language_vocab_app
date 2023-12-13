'use strict';

module.exports = async (logger, mysqlClient, userSecret, languageId, word) => {
  logger.debug(`getCard service is retrieving the language name for languageId: ${languageId} and word: ${word}`);
  const userId = await mysqlClient.getUserIdFromSecret(userSecret);
  return await mysqlClient.getCard(userId, languageId, word);
};
