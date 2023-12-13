'use strict';

const express = require('express');

const handleLogin = require('./login');
const handleGetUserProfile = require('./getUserProfile');

module.exports = (userRoute, app, logger, mysqlClient) => {
  const userRouter = express.Router();
  handleLogin(userRouter, logger, mysqlClient);
  handleGetUserProfile(userRouter, logger, mysqlClient);
  app.use(userRoute, userRouter);
  logger.info(`using user router with base route: ${userRoute}`);
};
