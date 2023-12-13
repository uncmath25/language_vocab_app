'use strict';

module.exports = (logger) => {
  const knex = require('knex')({
    client: 'mysql',
    connection: {
      host: process.env.MYSQL_HOST,
      port: process.env.MYSQL_PORT,
      user: process.env.MYSQL_USER,
      password: process.env.NODE_ENV == 'development' ? process.env.MYSQL_ROOT_PASSWORD : process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DB
    }
  });
  return {
    getLanguageNames: async () => {
      const query = await knex.table('languages').select('id', 'name');
      return Object.fromEntries(query.map(row => [row.id, row.name]));
    },
    getWordTypeNames: async () => {
      const query = await knex.table('word_types').select('id', 'type');
      return Object.fromEntries(query.map(row => [row.id, row.type]));
    },
    getPracticeModeNames: async () => {
      const query = await knex.table('card_practice_modes').select('id', 'name');
      return Object.fromEntries(query.map(row => [row.id, row.name]));
    },
    getUserIdFromSecret: async (userSecret) => {
      return (await knex.table('passwords').select('user_id').where('user_secret', userSecret).first()).user_id;
    },
    getUserIdFromName: async (userName) => {
      const query = await knex.table('users').select('id').where('name', userName).first();
      return query == null ? null : query.id;
    },
    getUserSecret: async (userId, password) => {
      const query = await knex.table('passwords').select('user_secret').where('user_id', userId).where('password', password).first();
      return query == null ? null : query.user_secret;
    },
    getUserProfile: async (userId) => {
      return await knex.table('users').select('id', 'name', 'default_language_id as defaultLanguageId').where('id', userId).first();
    },
    getUserLanguageIds: async (userId) => {
      const query = await knex.table('user_languages').select('language_id as languageId').where('user_id', userId);
      return query.map(row => row.languageId);
    },
    getCard: async (userId, languageId, word) => {
      return await knex.table('cards').select('id', 'word', 'translation', 'type_id as typeId', 'details', 'familiarity')
        .where('user_id', userId).where('language_id', languageId).where('word', word).first();
    },
    addNewCard: async (fullCard) => {
      return await knex.table('cards').insert(fullCard);
    },
    removeCard: async (cardId) => {
      await knex.table('cards').where('id', cardId).del();
    },
    updateCard: async (cardId, card) => {
      await knex.table('cards').update('word', card.word).update('translation', card.translation).update('type_id ', card.typeId)
        .update('details', card.details).update('familiarity', card.familiarity).where('id', cardId);
    },
    getCardsByFamiliarityOrdered: async (userId, languageId, familiarity, limit) => {
      return await knex.table('cards').select('id', 'word', 'translation', 'type_id as typeId', 'details', 'familiarity')
        .where('user_id', userId).where('language_id', languageId).where('familiarity', familiarity).limit(limit).orderBy('word');
    },
    getCardsByFamiliarityRandom: async (userId, languageId, familiarity, limit) => {
      return await knex.table('cards').select('id', 'word', 'translation', 'type_id as typeId', 'details', 'familiarity')
        .where('user_id', userId).where('language_id', languageId).where('familiarity', familiarity).limit(limit).orderByRaw('RAND()');
    },
    getCardsNotMemorizedRandom: async (userId, languageId, limit) => {
      return await knex.table('cards').select('id', 'word', 'translation', 'type_id as typeId', 'details', 'familiarity')
        .where('user_id', userId).where('language_id', languageId).where('familiarity', '<', 100).limit(limit).orderByRaw('RAND()');
    },
    getCardsFamiliarities: async (userId, languageId) => {
      return await knex.table('cards').select('id', 'familiarity').where('user_id', userId).where('language_id', languageId);
    },
    getCardsByIdByRandom: async (userId, languageId, cardIds) => {
      return await knex.table('cards').select('id', 'word', 'translation', 'type_id as typeId', 'details', 'familiarity')
        .where('user_id', userId).where('language_id', languageId).havingIn('id', cardIds).orderByRaw('RAND()');
    }
  };
};
