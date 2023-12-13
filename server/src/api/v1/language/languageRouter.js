'use strict';

const express = require('express');

const handleGetLanguageNames = require('./getLanguageNames');
const handleGetWordTypeNames = require('./getWordTypeNames');

module.exports = (languageRoute, app, logger, mysqlClient) => {
  const languageRouter = express.Router();
  handleGetLanguageNames(languageRouter, logger, mysqlClient);
  handleGetWordTypeNames(languageRouter, logger, mysqlClient);
  app.use(languageRoute, languageRouter);
  logger.info(`using language router with base route: ${languageRoute}`);
};
