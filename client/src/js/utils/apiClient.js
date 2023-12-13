const ROOT_API_URL = `${process.env.REACT_APP_API_URL}/api/v1`

export function getResource(route, userSecret) {
  return fetch(`${ROOT_API_URL}/${route}`, {
    method: "GET",
    headers: {
      "X-User-Secret": userSecret
    }
  }).then(response => response.json());
}

export function postResource(route, data, userSecret) {
  return fetch(`${ROOT_API_URL}/${route}`, {
    method: "POST",
    headers: {
      "X-User-Secret": userSecret,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  }).then(response => response.json());
}

export function putResource(route, data, userSecret) {
  return fetch(`${ROOT_API_URL}/${route}`, {
    method: "PUT",
    headers: {
      "X-User-Secret": userSecret,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  }).then(response => response.json());
}
