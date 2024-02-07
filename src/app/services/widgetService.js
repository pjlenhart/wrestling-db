import http from './httpService';

const announcementsEndpoint = '/wrestling-api/announcements';

export async function getAnnouncements() {
    return http.get(`${announcementsEndpoint}/`);
}
