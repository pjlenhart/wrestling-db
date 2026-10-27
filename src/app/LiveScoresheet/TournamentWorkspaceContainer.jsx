import React, { useCallback, useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { getWrestlers } from '../services/rosterService';
import { getSchools } from '../services/schoolService';
import { getDraft, saveDraft, deleteDraft, isTournamentDraft, DraftStoreError } from './storage/draftStore';
import { readCachedRoster, writeCachedRoster } from './storage/rosterCache';
import { getScoresheet, submitTournamentBout, isServerId, tournamentSheetFromServer } from './services/scoresheetApi';
import {
    addEvent,
    undoLastEvent,
    removeEvent,
    BOUT_FINAL,
    BOUT_IN_PROGRESS,
    BOUT_SCHEDULED,
} from './scoring/liveBout';
import { canEditScoresheets } from './permissions';
import TournamentWorkspace from './components/TournamentWorkspace';

const TournamentWorkspaceContainer = () => {
    const { id } = useParams();
    const history = useHistory();

    const [draft, setDraft] = useState(null);
    const [roster, setRoster] = useState(readCachedRoster);
    const [schools, setSchools] = useState([]);
    const [notFound, setNotFound] = useState(false);
    const [error, setError] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    // A numeric id is a submitted sheet on the server; anything else is a draft
    // on this device. Only the latter can be scored.
    const fromServer = isServerId(id);
    const readOnly = fromServer || !canEditScoresheets();

    useEffect(() => {
        let cancelled = false;

        const load = async () => {
            if (fromServer) {
                try {
                    const { data } = await getScoresheet(id);
                    if (cancelled) return;
                    // A dual's link can land here; send it where it belongs.
                    if (data.kind !== 'tournament') {
                        history.replace(`/scoresheet/${id}`);
                        return;
                    }
                    setDraft(tournamentSheetFromServer(data));
                } catch (err) {
                    if (cancelled) return;
                    if (err?.response?.status === 404) setNotFound(true);
                    else setError('That scoresheet could not be loaded.');
                }
                return;
            }

            try {
                const found = getDraft(id);
                if (!found) {
                    setNotFound(true);
                    return;
                }
                if (!isTournamentDraft(found)) {
                    history.replace(`/scoresheet/${id}`);
                    return;
                }
                setDraft(found);
            } catch (err) {
                setError(err instanceof DraftStoreError ? err.message : 'That scoresheet could not be opened.');
            }
        };

        load();
        return () => {
            cancelled = true;
        };
    }, [id, fromServer, history]);

    useEffect(() => {
        const loadRoster = async () => {
            try {
                const response = await getWrestlers();
                const fetched = response?.data || [];
                if (fetched.length) {
                    setRoster(fetched);
                    writeCachedRoster(fetched);
                }
            } catch (err) {
                // The cached roster is already loaded, so this is not fatal.
                console.error('Error fetching roster:', err);
            }
        };
        const loadSchools = async () => {
            try {
                const response = await getSchools();
                setSchools(response?.data || []);
            } catch (err) {
                // The school can always be typed, so the directory is optional.
                console.error('Error fetching schools:', err);
            }
        };
        loadRoster();
        loadSchools();
    }, []);

    /**
     * Persist on every change.
     *
     * A draft is the only copy of a bout in progress, so nothing is batched or
     * deferred -- a change that has been made is a change that has been written.
     */
    const updateDraft = useCallback((updater) => {
        setDraft((current) => {
            if (!current) return current;
            const next = updater(current);
            try {
                saveDraft(next);
                setError(null);
            } catch (err) {
                setError(
                    err instanceof DraftStoreError ? err.message : 'That change could not be saved to this device.',
                );
            }
            return next;
        });
    }, []);

    const updateBout = useCallback(
        (updater) => updateDraft((current) => ({ ...current, bout: updater(current.bout) })),
        [updateDraft],
    );

    const handleSubmit = async () => {
        setSubmitting(true);
        setError(null);

        try {
            const { data } = await submitTournamentBout(draft);
            // Only once the server has it is the local copy safe to remove.
            try {
                deleteDraft(draft.id);
            } catch (err) {
                console.error('Draft could not be cleared:', err);
            }
            history.push(`/scoresheet/tournament/${data.scoresheetId}`);
        } catch (err) {
            const status = err?.response?.status;
            const body = err?.response?.data;

            if (status === 401 || status === 403) {
                setError(
                    status === 403
                        ? 'That account is not allowed to submit scoresheets. Nothing was recorded, and this bout is still saved on this device.'
                        : 'Your session expired. Sign in again and press Record — this bout is still saved on this device.',
                );
                setSubmitting(false);
                return;
            }

            const problems = body?.problems ? ` (${body.problems.join('; ')})` : '';
            setError(
                body?.error
                    ? `${body.error}${problems} Nothing was recorded, and this bout is still saved on this device.`
                    : 'The bout could not be submitted. It is still saved on this device.',
            );
            setSubmitting(false);
        }
    };

    // The pad's handlers carry a weight, because a dual has fourteen bouts.
    // A tournament sheet has one, so the weight is ignored.
    const handlers = {
        onScore: (_weight, { side, period, token }) => updateBout((bout) => addEvent(bout, { side, period, token })),

        onUndo: () => updateBout(undoLastEvent),

        onRemoveEvent: (_weight, eventId) => updateBout((bout) => removeEvent(bout, eventId)),

        /** Accepts a roster option or a plain typed name, as a dual does. */
        onSetWrestler: (_weight, wrestler) =>
            updateBout((bout) => {
                const fromRoster = wrestler && typeof wrestler === 'object';
                return {
                    ...bout,
                    wrestlerId: fromRoster ? wrestler.wrestler_id : null,
                    wrestler: fromRoster ? wrestler.wrestler_name : wrestler || '',
                };
            }),

        onSetOpponent: (_weight, name) => updateBout((bout) => ({ ...bout, opponent: name })),

        /**
         * Unlike a dual, the names are left alone.
         *
         * A dual writes 'FF' over the side that did not wrestle. A tournament
         * forfeit is still a bout against a named opponent -- it is what goes
         * on our wrestler's record, and what stops it being entered twice.
         */
        onSetForfeit: (_weight, side) =>
            updateBout((bout) => {
                if (side) return { ...bout, forfeit: side, status: BOUT_FINAL };
                return { ...bout, forfeit: null, status: bout.events.length ? BOUT_IN_PROGRESS : BOUT_SCHEDULED };
            }),

        onSetWinner: (_weight, winner) => updateBout((bout) => ({ ...bout, winner })),

        onSetMethod: (_weight, method) => updateBout((bout) => ({ ...bout, method })),

        onSetStatus: (_weight, status) => updateBout((bout) => ({ ...bout, status })),

        onSetWeight: (weight) => updateBout((bout) => ({ ...bout, weight })),

        onSetSchool: ({ name, id: schoolId }) =>
            updateDraft((current) => ({ ...current, opponentSchool: name, opponentSchoolId: schoolId })),

        onSetMode: (mode) => updateBout((bout) => ({ ...bout, mode })),

        onSetQuick: (quick) => updateBout((bout) => ({ ...bout, quick })),

        onSetFallTime: (fallTime) => updateBout((bout) => ({ ...bout, fallTime })),

        onSubmit: handleSubmit,
    };

    return (
        <TournamentWorkspace
            draft={draft}
            roster={roster}
            schools={schools}
            notFound={notFound}
            error={error}
            readOnly={readOnly}
            fromServer={fromServer}
            submitting={submitting}
            {...handlers}
        />
    );
};

export default TournamentWorkspaceContainer;
