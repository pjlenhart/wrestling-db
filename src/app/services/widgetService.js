import http from "./httpService";
import auth from "./authService";

const announcementsEndpoint = "/wrestling-api/announcements";

export async function getAnnouncements() {
  return http.get(`${announcementsEndpoint}/`, {
    headers: {
      Authorization: `JWT ${auth.getJwt()}`,
    },
  });
}
