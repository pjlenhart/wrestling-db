import React, { useCallback, useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { getWrestlers } from '../services/rosterService';
import { getDraft, saveDraft, deleteDraft, DraftStoreError } from './storage/draftStore';
import { readCachedRoster, writeCachedRoster } from './storage/rosterCache';
import { getScoresheet, submitScoresheet, isServerId } from './services/scoresheetApi';
import {
    addEvent,
    undoLastEvent,
    removeEvent,
    BOUT_FINAL,
    BOUT_IN_PROGRESS,
    SIDE_BOTH,
    SIDE_OURS,
    SIDE_THEIRS,
} from './scoring/liveBout';
import { canEditScoresheets } from './permissions';
import ScoringWorkspace from './components/ScoringWorkspace';

/** A stored sheet, shaped like the draft the workspace already knows how to render. */
const sheetFromServer = (row) => ({
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

const ScoresheetWorkspaceContainer = () => {
    const { id } = useParams();
    const history = useHistory();

    const [draft, setDraft] = useState(null);
    const [roster, setRoster] = useState(readCachedRoster);
    const [activeWeight, setActiveWeight] = useState(null);
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
                    const sheet = sheetFromServer(data);
                    setDraft(sheet);
                    setActiveWeight(sheet.bouts.length ? sheet.bouts[0].weight : null);
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
                setDraft(found);
                setActiveWeight(found.bouts.length ? found.bouts[0].weight : null);
            } catch (err) {
                setError(err instanceof DraftStoreError ? err.message : 'That scoresheet could not be opened.');
            }
        };

        load();
        return () => {
            cancelled = true;
        };
    }, [id, fromServer]);

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
        loadRoster();
    }, []);

    /**
     * Persist on every change.
     *
     * A draft is the only copy of a dual in progress, so nothing is batched or
     * deferred -- a change that has been made is a change that has been written.
     */
    const updateBout = useCallback(
        (weight, updater) => {
            setDraft((current) => {
                if (!current) return current;
                const next = {
                    ...current,
                    bouts: current.bouts.map((bout) => (bout.weight === weight ? updater(bout) : bout)),
                };
                try {
                    saveDraft(next);
                    setError(null);
                } catch (err) {
                    setError(
                        err instanceof DraftStoreError
                            ? err.message
                            : 'That change could not be saved to this device.',
                    );
                }
                return next;
            });
        },
        [],
    );

    const handleSubmit = async ({ officialOurScore, officialOpponentScore }) => {
        setSubmitting(true);
        setError(null);

        const payload = { ...draft, officialOurScore, officialOpponentScore };

        try {
            const { data } = await submitScoresheet(payload);
            // Only once the server has it is the local copy safe to remove.
            try {
                deleteDraft(draft.id);
            } catch (err) {
                console.error('Draft could not be cleared:', err);
            }
            history.push(`/scoresheet/${data.scoresheetId}`);
        } catch (err) {
            const status = err?.response?.status;
            const body = err?.response?.data;

            // A session that lapsed mid-dual is the likeliest failure here, and
            // the one worth naming precisely -- the draft is untouched, so the
            // fix is to sign in again, not to re-score anything.
            if (status === 401 || status === 403) {
                setError(
                    status === 403
                        ? 'That account is not allowed to submit scoresheets. Nothing was recorded, and this dual is still saved on this device.'
                        : 'Your session expired. Sign in again and press Finish — this dual is still saved on this device.',
                );
                setSubmitting(false);
                return;
            }

            const problems = body?.problems ? ` (${body.problems.join('; ')})` : '';
            setError(
                body?.error
                    ? `${body.error}${problems} Nothing was recorded, and this dual is still saved on this device.`
                    : 'The scoresheet could not be submitted. It is still saved on this device.',
            );
            setSubmitting(false);
        }
    };

    /**
     * Move to the bout after `weight`, if there is one.
     *
     * A finished bout is almost never the one you want to be looking at, and
     * leaving the pad pointed at it is how the next bout's first takedown ends
     * up on the previous wrestler's line.
     */
    const advanceFrom = (weight) => {
        if (!draft) return;
        const at = draft.bouts.findIndex((b) => b.weight === weight);
        const next = at >= 0 ? draft.bouts[at + 1] : null;
        if (next) setActiveWeight(next.weight);
    };

    const handlers = {
        onSelectBout: setActiveWeight,

        onScore: (weight, { side, period, token }) =>
            updateBout(weight, (bout) => addEvent(bout, { side, period, token })),

        onUndo: (weight) => updateBout(weight, undoLastEvent),

        onRemoveEvent: (weight, eventId) => updateBout(weight, (bout) => removeEvent(bout, eventId)),

        /**
         * Accepts a roster option or a plain typed name.
         *
         * Only a roster pick carries an id, and that id is what ties the bout to
         * a wrestler rather than to a string the server has to match back.
         */
        onSetWrestler: (weight, wrestler) =>
            updateBout(weight, (bout) => {
                const fromRoster = wrestler && typeof wrestler === 'object';
                const name = fromRoster ? wrestler.wrestler_name : wrestler || '';
                return {
                    ...bout,
                    wrestlerId: fromRoster ? wrestler.wrestler_id : null,
                    wrestler: name,
                    forfeit: bout.forfeit === 'ours' && name ? null : bout.forfeit,
                };
            }),

        onSetOpponent: (weight, name) =>
            updateBout(weight, (bout) => ({
                ...bout,
                opponent: name,
                forfeit: bout.forfeit === 'theirs' && name ? null : bout.forfeit,
            })),

        /**
         * `side` is 'ours', 'theirs', 'both', or null to clear it.
         *
         * The names are kept consistent with what was conceded, the way the
         * paper sheet reads: 'FF' stands in for the side that did not wrestle,
         * and our own line is cleared because no wrestler of ours took the mat.
         * Scoring does not depend on any of this -- the forfeit itself is what
         * the engine reads -- but a sheet that says one thing and scores another
         * is worse than one that is merely terse.
         */
        onSetForfeit: (weight, side) => {
            // A conceded bout is over too, so it advances like any other.
            if (side) advanceFrom(weight);

            return updateBout(weight, (bout) => {
                const cleared = (value) => (value === 'FF' ? '' : value);

                if (side === SIDE_THEIRS) {
                    return { ...bout, forfeit: side, opponent: 'FF', status: BOUT_FINAL };
                }
                if (side === SIDE_OURS) {
                    return {
                        ...bout,
                        forfeit: side,
                        wrestlerId: null,
                        wrestler: '',
                        opponent: cleared(bout.opponent),
                        status: BOUT_FINAL,
                    };
                }
                if (side === SIDE_BOTH) {
                    return {
                        ...bout,
                        forfeit: side,
                        wrestlerId: null,
                        wrestler: '',
                        opponent: '',
                        status: BOUT_FINAL,
                    };
                }

                // Cleared: drop the placeholder so the field reads as empty
                // again rather than as an opponent called 'FF'.
                return {
                    ...bout,
                    forfeit: null,
                    opponent: cleared(bout.opponent),
                    status: BOUT_IN_PROGRESS,
                };
            });
        },

        onSetWinner: (weight, winner) => updateBout(weight, (bout) => ({ ...bout, winner })),

        onSetMethod: (weight, method) => updateBout(weight, (bout) => ({ ...bout, method })),

        onSetStatus: (weight, status) => {
            updateBout(weight, (bout) => ({ ...bout, status }));
            if (status === BOUT_FINAL) advanceFrom(weight);
        },

        onSubmit: handleSubmit,
    };

    return (
        <ScoringWorkspace
            draft={draft}
            roster={roster}
            activeWeight={activeWeight}
            notFound={notFound}
            error={error}
            readOnly={readOnly}
            fromServer={fromServer}
            submitting={submitting}
            {...handlers}
        />
    );
};

export default ScoresheetWorkspaceContainer;
