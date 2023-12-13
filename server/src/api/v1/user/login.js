'use strict';

const validateUserCreds = require('../../../service/user/validateUserCreds');

const ROUTE_NAME = '/login';

module.exports = (app, logger, mysqlClient) => {
  app.post(ROUTE_NAME, async (req, res) => {
    try {
      const { username, password } = req.body;
      logger.debug(`login router received a request for username: ${username} and password: ${password}`);
      const userSecret = await validateUserCreds(logger, mysqlClient, username, password);
      res.status(200).json({isValid: userSecret !== null, userSecret: userSecret});
    } catch (err) {
      logger.error(err);
      res.status(500).json({description: 'Server failure'});
    }
  });
};
