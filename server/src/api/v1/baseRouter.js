'use strict';

const express = require('express');

const handleValidate = require('./validate');
const useCardRouter = require('./card/cardRouter');
const useLanguageRouter = require('./language/languageRouter');
const useUserRouter = require('./user/userRouter');

const CARD_ROUTE_NAME = '/card';
const LANGUAGE_ROUTE_NAME = '/language';
const USER_ROUTE_NAME = '/user';

module.exports = (baseRoute, app, logger, mysqlClient) => {
  const baseRouter = express.Router();
  handleValidate(baseRouter, logger, mysqlClient);
  app.use(baseRoute, baseRouter);
  useCardRouter(baseRoute + CARD_ROUTE_NAME, app, logger, mysqlClient);
  useLanguageRouter(baseRoute + LANGUAGE_ROUTE_NAME, app, logger, mysqlClient);
  useUserRouter(baseRoute + USER_ROUTE_NAME, app, logger, mysqlClient);
  logger.info(`using base router with base route: ${baseRoute}`);
};
