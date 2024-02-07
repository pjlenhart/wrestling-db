import http from './httpService';

const apiEndpoint = '/wrestling-api/schools';

export async function getSchools() {
    return http.get(`${apiEndpoint}/`);
}

export function getSchoolById(schoolId) {
    return http.get(`${apiEndpoint}/${schoolId}`);
}
