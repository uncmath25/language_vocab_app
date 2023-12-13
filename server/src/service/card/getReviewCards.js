'use strict';

module.exports = async (logger, mysqlClient, userSecret, languageId, config) => {
  logger.debug(`getReviewCards service is retrieving the language name for languageId: ${languageId} and config: ${JSON.stringify(config)}`);
  const userId = await mysqlClient.getUserIdFromSecret(userSecret);
  const familiarity = config.familiarity;
  const limit = config.numCards;
  return await mysqlClient.getCardsByFamiliarityOrdered(userId, languageId, familiarity, limit);
};
