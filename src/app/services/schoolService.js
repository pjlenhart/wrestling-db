import http from "./httpService";
import auth from "./authService";

const apiEndpoint = "/wrestling-api/schools";

export async function getSchools() {
  return http.get(`${apiEndpoint}/`, {
    headers: {
      Authorization: `JWT ${auth.getJwt()}`,
    },
  });
}

export function getSchoolById(schoolId) {
  return http.get(`${apiEndpoint}/${schoolId}`, {
    headers: {
      Authorization: `JWT ${auth.getJwt()}`,
    },
  });
}
