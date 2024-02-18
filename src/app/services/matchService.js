import http from './httpService';

const apiEndpointRegularSeason = '/wrestling-api/matches/regular-season';
const apiEndpointIndividual = '/wrestling-api/matches/individual';

export async function getRegularSeasonMatches() {
    return http.get(`${apiEndpointRegularSeason}`);
}

export function getRegularSeasonMatchByWrestler(wrestlerId) {
    return http.get(`${apiEndpointRegularSeason}/${wrestlerId}`);
}

export async function getIndividualMatches() {
    return http.get(`${apiEndpointIndividual}`);
}

export function getIndividualMatchByWrestler(wrestlerId) {
    return http.get(`${apiEndpointIndividual}/${wrestlerId}`);
}
