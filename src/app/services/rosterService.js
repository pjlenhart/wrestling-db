import http from './httpService';

const apiEndpoint = '/wrestling-api/wrestlers';

export async function getWrestlers() {
    return http.get(`${apiEndpoint}/`);
}

export function getWrestlerById(wrestlerId) {
    return http.get(`${apiEndpoint}/${wrestlerId}`);
}
