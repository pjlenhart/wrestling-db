import http from './httpService';

const apiEndpoint = '/wrestling-api/statistics';

export async function getCareerStats() {
    return http.get(`${apiEndpoint}/career-stats`);
}

export function getCareerStatsByWrestler(wrestlerId) {
    return http.get(`${apiEndpoint}/career-stats/${wrestlerId}`);
}
