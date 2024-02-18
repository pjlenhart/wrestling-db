import http from './httpService';

const infoEndpoint = '/wrestling-api/info';

export async function getAnnouncements() {
    return http.get(`${infoEndpoint}/announcements`);
}

export async function getAccoladesByWrestler(id) {
    return http.get(`${infoEndpoint}/accolades/${id}`);
}
