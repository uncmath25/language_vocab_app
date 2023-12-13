'use strict';

module.exports = async (logger, mysqlClient, userSecret) => {
  logger.debug(`validateUserSecret service is validating for userSecret: ${userSecret}`);
  try {
    const userId = await mysqlClient.getUserIdFromSecret(userSecret);
    return true;
  } catch {
    return false;
  }
};
