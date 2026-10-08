import http from './httpService';

const infoEndpoint = '/wrestling-api/info';

export async function getAnnouncements() {
    return http.get(`${infoEndpoint}/announcements`);
}

export async function getAccoladesByWrestler(id) {
    return http.get(`${infoEndpoint}/accolades/${id}`);
}

/** Calendar events for the season starting in November of `seasonStartYear`. */
export async function getEvents(seasonStartYear) {
    return http.get(`${infoEndpoint}/events`, {
        params: { season: seasonStartYear },
    });
}
