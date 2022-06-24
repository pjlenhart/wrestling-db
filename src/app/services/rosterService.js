import http from "./httpService";
import auth from "./authService";

const apiEndpoint = "/wrestling-api/wrestlers";

export async function getWrestlers() {
  return http.get(`${apiEndpoint}/`, {
    headers: {
      Authorization: `JWT ${auth.getJwt()}`,
    },
  });
}

export function getWrestlerById(wrestlerId) {
  return http.get(`${apiEndpoint}/${wrestlerId}`, {
    headers: {
      Authorization: `JWT ${auth.getJwt()}`,
    },
  });
}
