import http from "./httpService";

const apiEndpoint = "/wrestling-api/team-matches";

export async function getTeamMatches(order = "asc") {
  if (order === "asc") return http.get(`${apiEndpoint}/?ordering=match_date`);
  return http.get(`${apiEndpoint}/?ordering=-match_date`);
}

export function getTeamMatchById(teamMatchId) {
  return http.get(`${apiEndpoint}/${teamMatchId}`);
}
