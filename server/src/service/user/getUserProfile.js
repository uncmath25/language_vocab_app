'use strict';

module.exports = async (logger, mysqlClient, userSecret) => {
  logger.debug(`getUserProfile service is retrieving the user profile for userSecret: ${userSecret}`);
  const userId = await mysqlClient.getUserIdFromSecret(userSecret);
  const userProfile = await mysqlClient.getUserProfile(userId);
  const languageIds = await mysqlClient.getUserLanguageIds(userId);
  userProfile.languageIds = languageIds;
  return userProfile;
};
