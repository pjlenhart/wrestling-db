import http from './httpService';

const apiEndpoint = '/wrestling-api/matches/team-matches';

export async function getTeamMatches(order = 'asc') {
    return http.get(`${apiEndpoint}/`);
}

export function getTeamMatchById(teamMatchId) {
    return http.get(`${apiEndpoint}/${teamMatchId}`);
}
