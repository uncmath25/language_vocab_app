import { getResource } from './apiClient';

const LANGUAGE_ROUTE = "language";

export function getLanguageNames(userSecret) {
  return getResource(`${LANGUAGE_ROUTE}/names`, userSecret).then(data => data.languageNamesMap);
}

export function getWordTypeNames(userSecret) {
  return getResource(`${LANGUAGE_ROUTE}/wordTypeNames`, userSecret).then(data => data.wordTypeNamesMap);
}
