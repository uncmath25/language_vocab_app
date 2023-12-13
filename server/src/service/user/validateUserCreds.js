'use strict';

module.exports = async (logger, mysqlClient, username, password) => {
  logger.debug(`validateUserCreds service is validating for username: ${username} and password: ${password}`);
  const userId = await mysqlClient.getUserIdFromName(username);
  if (userId == null) {
    logger.error(`Invalid username: ${username}`);
    return null;
  }
  const userSecret = await mysqlClient.getUserSecret(userId, password);
  if (userSecret == null) {
    logger.error(`Invalid password: ${password}`);
    return null;
  }
  logger.info('Login successful');
  return userSecret;
};
