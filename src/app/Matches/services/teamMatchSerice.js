import http from "../../services/httpService";

const apiEndpoint = "/wrestling-api/matches/";

export async function getTeamMatches() {
  return http.get(apiEndpoint);
}

export function getTeamMatchById(teamMatchId) {
  return http.get(`${apiEndpoint}/${teamMatchId}`);
}
