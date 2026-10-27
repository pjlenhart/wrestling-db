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

/**
 * Submit a finished tournament bout.
 *
 * The same rule as a dual: only the marks, or the quick result as typed, are
 * sent. What gets recorded is derived again on the server.
 */
export async function submitTournamentBout(draft) {
    return http.post(
        `${apiEndpoint}/tournament`,
        {
            tournament: draft.tournament,
            matchDate: draft.matchDate,
            opponentSchool: draft.opponentSchool,
            opponentSchoolId: draft.opponentSchoolId,
            bout: draft.bout,
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

/** A stored dual, shaped like the draft the workspace already knows how to render. */
export const dualSheetFromServer = (row) => ({
    id: String(row.scoresheet_id),
    matchDate: String(row.match_date || '').slice(0, 10),
    opponentSchool: row.opponent_school,
    opponentSchoolId: row.school_id,
    venue: row.venue,
    startingWeight: row.starting_weight,
    status: row.status,
    bouts: row.bouts || [],
    officialOurScore: row.official_our_score,
    officialOpponentScore: row.official_opponent_score,
    report: row.report,
    teamMatchId: row.team_match_id,
});

/**
 * A stored tournament sheet, shaped like its draft.
 *
 * The tournament's name is kept inside the one stored bout, so it is lifted
 * back out to sit beside the date where the draft keeps it.
 */
export const tournamentSheetFromServer = (row) => {
    const { tournament, ...bout } = (row.bouts && row.bouts[0]) || {};
    return {
        id: String(row.scoresheet_id),
        kind: row.kind,
        tournament: tournament || '',
        matchDate: String(row.match_date || '').slice(0, 10),
        opponentSchool: row.opponent_school,
        opponentSchoolId: row.school_id,
        status: row.status,
        report: row.report,
        bout,
    };
};

/**
 * Local drafts carry a generated string id; server sheets have a numeric one.
 * That is the whole distinction the routes need.
 */
export const isServerId = (id) => /^\d+$/.test(String(id));

const scoresheetApi = {
    getScoresheets,
    getScoresheet,
    submitScoresheet,
    submitTournamentBout,
    commitScoresheet,
    deleteScoresheet,
    isServerId,
    dualSheetFromServer,
    tournamentSheetFromServer,
};

export default scoresheetApi;
