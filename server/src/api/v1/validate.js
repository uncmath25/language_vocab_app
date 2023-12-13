'use strict';

const validateUserSecret = require('../../service/validateUserSecret');

const USER_SECRET_HEADER = 'X-User-Secret';
const LOGIN_ROUTE_NAME = '/user/login';

module.exports = (app, logger, mysqlClient) => {
  app.all('*', async (req, res, next) => {
    try {
      if (req.url === LOGIN_ROUTE_NAME) return next();
      const userSecret = req.header(USER_SECRET_HEADER);
      logger.debug(`validate router received a request with userSecret: ${userSecret}`);
      const isValid = await validateUserSecret(logger, mysqlClient, userSecret);
      if (isValid) return next();
      logger.error('Invalid user secret!')
      res.status(401).json({description: `Invalid userSecret: ${userSecret}`});
    } catch (err) {
      logger.error(err);
      res.status(500).json({description: 'Server failure'});
    }
  });
};
