'use strict';

const express = require('express');

const handleGetCard = require('./getCard');
const handleGetPracticeCards = require('./getPracticeCards');
const handleGetPracticeModeNames = require('./getPracticeModeNames');
const handleGetReviewCards = require('./getReviewCards');
const handleRemoveCard = require('./removeCard');
const handleUpdateCard = require('./updateCard');

module.exports = (cardRoute, app, logger, mysqlClient) => {
  const cardRouter = express.Router();
  handleGetCard(cardRouter, logger, mysqlClient);
  handleGetPracticeCards(cardRouter, logger, mysqlClient);
  handleGetPracticeModeNames(cardRouter, logger, mysqlClient);
  handleGetReviewCards(cardRouter, logger, mysqlClient);
  handleRemoveCard(cardRouter, logger, mysqlClient);
  handleUpdateCard(cardRouter, logger, mysqlClient);
  app.use(cardRoute, cardRouter);
  logger.info(`using card router with base route: ${cardRoute}`);
};
