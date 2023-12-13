'use strict';

const getUserProfile = require('../../../service/user/getUserProfile');

const USER_SECRET_HEADER = 'X-User-Secret';
const ROUTE_NAME = '/profile';

module.exports = (app, logger, mysqlClient) => {
  app.get(ROUTE_NAME, async (req, res) => {
    try {
      const userSecret = req.header(USER_SECRET_HEADER);
      logger.debug(`getUserProfile router received a request for userSecret: ${userSecret}`);
      const userProfile = await getUserProfile(logger, mysqlClient, userSecret);
      if (userProfile == null) {
        res.status(404).json({description: `No user profle was found for userSecret: ${userSecret}`});
      } else {
        res.status(200).json({userProfile: userProfile});
      }
    } catch (err) {
      logger.error(err);
      res.status(500).json({description: 'Server failure'});
    }
  });
};
