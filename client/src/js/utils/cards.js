import { getResource, postResource, putResource } from './apiClient';

const CARD_ROUTE = "card";

export const FAMILIARITY_MAP = {
  0: "New (0%)",
  30: "Learning (30%)",
  60: "Reviewing (60%)",
  90: "Learned (90%)",
  100: "Memorized (100%)"
};

export function getPracticeModeNames(userSecret) {
  return getResource(`${CARD_ROUTE}/practiceModeNames`, userSecret).then(data => data.practiceModeNamesMap);
}

export function getCard(userSecret, languageId, word) {
  return getResource(`${CARD_ROUTE}/${languageId}/${word}`, userSecret);
}

export function updateCard(userSecret, languageId, card) {
  return putResource(`${CARD_ROUTE}/update/${languageId}`, {card: card}, userSecret);
}

export function removeCard(userSecret, languageId, word) {
  return putResource(`${CARD_ROUTE}/remove/${languageId}`, {word: word}, userSecret);
}

export function getPracticeCards(userSecret, languageId, config) {
  return postResource(`${CARD_ROUTE}/practice/${languageId}`, {config: config}, userSecret).then(data => data.cards);
}

export function getReviewCards(userSecret, languageId, config) {
  return postResource(`${CARD_ROUTE}/review/${languageId}`, {config: config}, userSecret).then(data => data.cards);
}
