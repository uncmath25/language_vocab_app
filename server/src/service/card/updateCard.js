'use strict';

module.exports = async (logger, mysqlClient, userSecret, languageId, card) => {
  logger.debug(`updateCard service is updating for the language name for languageId: ${languageId} and card: ${JSON.stringify(card)}`);
  const userId = await mysqlClient.getUserIdFromSecret(userSecret);
  const existingCard = await mysqlClient.getCard(userId, languageId, card.word);
  if (existingCard == null) {
    const fullCard = {
      user_id: userId,
      language_id: languageId,
      word: card.word,
      translation: card.translation,
      type_id: card.typeId,
      details: card.details,
      familiarity: card.familiarity
    }
    await mysqlClient.addNewCard(fullCard);
  } else {
    await mysqlClient.updateCard(existingCard.id, card);
  }
  return true;
};
