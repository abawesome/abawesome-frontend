import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/users/";

export function register(user) {
  const response = fetch(apiEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  }).then(res => res.json());
  return response;
}
