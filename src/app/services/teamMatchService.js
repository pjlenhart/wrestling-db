import http from "./httpService";
import auth from "./authService";

const apiEndpoint = "/wrestling-api/team-matches";

export async function getTeamMatches(order = "asc") {
  if (order === "asc")
    return http.get(`${apiEndpoint}/?ordering=match_date`, {
      headers: {
        Authorization: `JWT ${auth.getJwt()}`,
      },
    });
  return http.get(`${apiEndpoint}/?ordering=-match_date`, {
    headers: {
      Authorization: `JWT ${auth.getJwt()}`,
    },
  });
}

export function getTeamMatchById(teamMatchId) {
  return http.get(`${apiEndpoint}/${teamMatchId}`, {
    headers: {
      Authorization: `JWT ${auth.getJwt()}`,
    },
  });
}
