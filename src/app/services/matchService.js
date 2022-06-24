import http from "./httpService";
import auth from "./authService";

const apiEndpointRegularSeason = "/wrestling-api/regular-season";
const apiEndpointIndividual = "/wrestling-api/postseason";

export async function getRegularSeasonMatches() {
  return http.get(`${apiEndpointRegularSeason}/?ordering=-match_date`, {
    headers: {
      Authorization: `JWT ${auth.getJwt()}`,
    },
  });
}

export function getRegularSeasonMatchById(matchId) {
  return http.get(`${apiEndpointRegularSeason}/${matchId}`, {
    headers: {
      Authorization: `JWT ${auth.getJwt()}`,
    },
  });
}

export function getRegularSeasonMatchByWrestler(wrestlerId) {
  return http.get(`${apiEndpointRegularSeason}/?wrestler_id=${wrestlerId}`, {
    headers: {
      Authorization: `JWT ${auth.getJwt()}`,
    },
  });
}

export async function getIndividualMatches() {
  return http.get(`${apiEndpointIndividual}/?ordering=-match_date`, {
    headers: {
      Authorization: `JWT ${auth.getJwt()}`,
    },
  });
}

export function getIndividualMatchById(matchId) {
  return http.get(`${apiEndpointIndividual}/${matchId}`, {
    headers: {
      Authorization: `JWT ${auth.getJwt()}`,
    },
  });
}

export function getIndividualMatchByWrestler(wrestlerId) {
  return http.get(`${apiEndpointIndividual}/?wrestler_id=${wrestlerId}`, {
    headers: {
      Authorization: `JWT ${auth.getJwt()}`,
    },
  });
}
