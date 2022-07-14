import http from "./httpService";
import auth from "./authService";

const apiEndpoint = "/wrestling-api/career-stats";

export async function getCareerStats() {
  return http.get(`${apiEndpoint}/`, {
    headers: {
      Authorization: `JWT ${auth.getJwt()}`,
    },
  });
}

export function getCareerStatsByWrestler(wrestlerId) {
  return http.get(`${apiEndpoint}/${wrestlerId}`, {
    headers: {
      Authorization: `JWT ${auth.getJwt()}`,
    },
  });
}
