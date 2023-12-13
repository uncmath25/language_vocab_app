'use strict';

const NEW_FAMILIARITY = 0;
const LEARN_FAMILIARITY = 30;
const REVIEW_FAMILIARITY = 60;
const REFRESH_FAMILIARITY = 90;

module.exports = async (logger, mysqlClient, userSecret, languageId, config) => {
  logger.debug(`getPracticeCards service is retrieving the language name for languageId: ${languageId} and config: ${JSON.stringify(config)}`);
  const userId = await mysqlClient.getUserIdFromSecret(userSecret);
  const practiceModeId = config.practiceModeId;
  const limit = config.numCards;
  if (practiceModeId == 1) {
    return await mysqlClient.getCardsByFamiliarityRandom(userId, languageId, NEW_FAMILIARITY, limit);
  } else if (practiceModeId == 2) {
    return await mysqlClient.getCardsByFamiliarityRandom(userId, languageId, LEARN_FAMILIARITY, limit);
  } else if (practiceModeId == 3) {
    return await mysqlClient.getCardsByFamiliarityRandom(userId, languageId, REVIEW_FAMILIARITY, limit);
  } else if (practiceModeId == 4) {
    return await mysqlClient.getCardsByFamiliarityRandom(userId, languageId, REFRESH_FAMILIARITY, limit);
  } else if (practiceModeId == 5) {
    return await mysqlClient.getCardsNotMemorizedRandom(userId, languageId, limit);
  } else if (practiceModeId == 6) {
    const familiarities = await mysqlClient.getCardsFamiliarities(userId, languageId);
    const cardIdSamplingPool = buildCardIdSamplingPool(familiarities);
    const cardIds = sampleCardIds(cardIdSamplingPool, limit);
    return await mysqlClient.getCardsByIdByRandom(userId, languageId, cardIds);
  }
};

const buildCardIdSamplingPool = (familiarities) => {
  const cardIdSample = [];
  familiarities.forEach(row => {
    if (row.familiarity == 100) return;
    let counter = ((90 - row.familiarity) / 30 + 1)**2;
    while (counter > 0) {
      cardIdSample.push(row.id);
      counter--;
    }
  });
  return cardIdSample;
};

const sampleCardIds = (cardIdSamplingPool, limit) => {
  const cardIds = [];
  while (cardIds.length < limit && cardIdSamplingPool.length > 0) {
    const cardId = selectRandom(cardIdSamplingPool)
    cardIds.push(cardId);
    cardIdSamplingPool = cardIdSamplingPool.filter(id => id != cardId);
  }
  return cardIds;
};

const selectRandom = (arr) => arr[Math.floor(Math.random()*arr.length)];
