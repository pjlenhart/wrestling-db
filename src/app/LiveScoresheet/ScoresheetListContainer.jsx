import React, { useEffect, useState } from 'react';
import { listDrafts, deleteDraft, DraftStoreError, STATUS_IN_PROGRESS } from './storage/draftStore';
import { getScoresheets } from './services/scoresheetApi';
import { deriveLiveDual } from './scoring/liveBout';
import ScoresheetList from './components/ScoresheetList';

/**
 * The two halves of the list.
 *
 * A dual being scored exists only on the device that is scoring it; a submitted
 * one exists only on the server. Neither source alone is the whole picture, so
 * both are fetched and normalised into one shape the list can render.
 */

const localRow = (draft) => {
    let ourScore = null;
    let opponentScore = null;
    let decidedCount = null;

    try {
        const dual = deriveLiveDual(draft);
        ourScore = dual.ourScore;
        opponentScore = dual.opponentScore;
        decidedCount = dual.decidedCount;
    } catch (err) {
        // A draft that will not derive still deserves a row -- it is the only
        // copy, and hiding it would be the one unrecoverable outcome.
    }

    return {
        key: `local-${draft.id}`,
        id: draft.id,
        source: 'local',
        matchDate: draft.matchDate,
        opponentSchool: draft.opponentSchool,
        venue: draft.venue,
        status: STATUS_IN_PROGRESS,
        ourScore,
        opponentScore,
        decidedCount,
        boutCount: (draft.bouts || []).length,
        draft,
    };
};

const serverRow = (sheet) => ({
    key: `server-${sheet.scoresheet_id}`,
    id: sheet.scoresheet_id,
    source: 'server',
    matchDate: String(sheet.match_date || '').slice(0, 10),
    opponentSchool: sheet.opponent_school,
    venue: sheet.venue,
    status: sheet.status,
    ourScore: sheet.our_score,
    opponentScore: sheet.opponent_score,
    decidedCount: null,
    boutCount: null,
    teamMatchId: sheet.team_match_id,
});

const ScoresheetListContainer = () => {
    const [rows, setRows] = useState([]);
    const [error, setError] = useState(null);
    const [notice, setNotice] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const load = async () => {
        setIsLoading(true);

        let local = [];
        try {
            local = listDrafts().map(localRow);
            setError(null);
        } catch (err) {
            setError(err instanceof DraftStoreError ? err.message : 'Saved scoresheets could not be loaded.');
        }

        let server = [];
        try {
            const response = await getScoresheets();
            server = (response?.data || []).map(serverRow);
            setNotice(null);
        } catch (err) {
            // Drafts on this device are still perfectly usable offline, so this
            // is a notice rather than an error.
            console.error('Error fetching scoresheets:', err);
            setNotice('Submitted scoresheets could not be loaded. Drafts on this device are still shown.');
        }

        const byDate = (a, b) => String(b.matchDate).localeCompare(String(a.matchDate));
        setRows([...local.sort(byDate), ...server.sort(byDate)]);
        setIsLoading(false);
    };

    useEffect(() => {
        load();
    }, []);

    const handleDelete = (row) => {
        if (row.source !== 'local') return;
        try {
            deleteDraft(row.id);
            load();
        } catch (err) {
            setError(err instanceof DraftStoreError ? err.message : 'That scoresheet could not be deleted.');
        }
    };

    return (
        <ScoresheetList
            rows={rows}
            error={error}
            notice={notice}
            isLoading={isLoading}
            onDelete={handleDelete}
        />
    );
};

export default ScoresheetListContainer;
