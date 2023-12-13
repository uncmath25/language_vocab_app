import { getResource, postResource } from './apiClient';

const USER_ROUTE = "user";

export function login(username, password) {
  return postResource(`${USER_ROUTE}/login`, {username: username, password: password});
}

export function getUserProfile(userSecret) {
  return getResource(`${USER_ROUTE}/profile`, userSecret).then(data => data.userProfile);
}
