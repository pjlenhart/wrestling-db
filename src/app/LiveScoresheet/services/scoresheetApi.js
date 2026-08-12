/**
 * The scoresheet API.
 *
 * In-progress duals live on the device and never reach the server. Submitting
 * is what publishes one -- and only then can it be read back from anywhere,
 * which is why the list has to come from both places.
 */

import http from '../../services/httpService';
import { authHeader } from './scoresheetAuth';

const apiEndpoint = '/wrestling-api/scoresheets';

/** Submitted sheets, newest first. Public -- no token needed. */
export async function getScoresheets() {
    return http.get(`${apiEndpoint}/`);
}

export async function getScoresheet(id) {
    return http.get(`${apiEndpoint}/${id}`);
}

/**
 * Submit a finished dual.
 *
 * Only the marks are sent. Every number that lands in the database is derived
 * again on the server -- what the screen showed while scoring is a convenience,
 * not evidence.
 */
export async function submitScoresheet(draft) {
    return http.post(
        `${apiEndpoint}/`,
        {
            matchDate: draft.matchDate,
            opponentSchool: draft.opponentSchool,
            opponentSchoolId: draft.opponentSchoolId,
            venue: draft.venue,
            startingWeight: draft.startingWeight,
            bouts: draft.bouts,
            officialOurScore: draft.officialOurScore,
            officialOpponentScore: draft.officialOpponentScore,
        },
        { headers: authHeader() },
    );
}

/** Retry the match-table write for a sheet that was stored but not recorded. */
export async function commitScoresheet(id) {
    return http.post(`${apiEndpoint}/${id}/commit`, {}, { headers: authHeader() });
}

export async function deleteScoresheet(id) {
    return http.delete(`${apiEndpoint}/${id}`, { headers: authHeader() });
}

/**
 * Local drafts carry a generated string id; server sheets have a numeric one.
 * That is the whole distinction the routes need.
 */
export const isServerId = (id) => /^\d+$/.test(String(id));

const scoresheetApi = {
    getScoresheets,
    getScoresheet,
    submitScoresheet,
    commitScoresheet,
    deleteScoresheet,
    isServerId,
};

export default scoresheetApi;
