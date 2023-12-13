'use strict';

module.exports = async (logger, mysqlClient, userSecret, languageId, word) => {
  logger.debug(`removeCard service is removing the card for languageId: ${languageId} and word: ${word}`);
  const userId = await mysqlClient.getUserIdFromSecret(userSecret);
  const existingCard = await mysqlClient.getCard(userId, languageId, word);
  if (existingCard == null) {
    logger.info('word does not exist, ignoring request...')
  } else {
    await mysqlClient.removeCard(existingCard.id);
  }
  return true;
};
