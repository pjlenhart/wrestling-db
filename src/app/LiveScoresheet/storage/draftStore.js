/**
 * Local persistence for live scoresheets.
 *
 * Until the API lands this is the only copy of a dual, so every write is
 * checked and every failure is reported rather than swallowed. A scorer who
 * silently loses a card at 190 has no way to reconstruct it.
 */

import { WEIGHT_CLASSES, boutOrder, createBout } from '../scoring/liveBout';

const STORAGE_KEY = 'wrestlingdb.liveScoresheets.v1';
const SCHEMA_VERSION = 1;

export const STATUS_IN_PROGRESS = 'In Progress';
export const STATUS_SUBMITTED = 'Submitted';

export class DraftStoreError extends Error {}

function readAll() {
    let raw;
    try {
        raw = window.localStorage.getItem(STORAGE_KEY);
    } catch (err) {
        throw new DraftStoreError(
            'This browser is blocking local storage, so scoresheets cannot be saved. ' +
                'Private browsing usually causes this.',
        );
    }

    if (!raw) return {};

    try {
        const parsed = JSON.parse(raw);
        return parsed && parsed.sheets ? parsed.sheets : {};
    } catch (err) {
        // Better to refuse than to quietly hand back an empty list and let the
        // next save overwrite whatever is actually in there.
        throw new DraftStoreError('The saved scoresheets on this device could not be read.');
    }
}

function writeAll(sheets) {
    try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ version: SCHEMA_VERSION, sheets }));
    } catch (err) {
        if (err && (err.name === 'QuotaExceededError' || err.code === 22)) {
            throw new DraftStoreError(
                'This device is out of local storage space. Submit or delete an old ' +
                    'scoresheet to free some up.',
            );
        }
        throw new DraftStoreError('The scoresheet could not be saved to this device.');
    }
}

function draftId() {
    return `ls_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

/** Newest first, so the sheet most likely to be resumed is at the top. */
export function listDrafts() {
    return Object.values(readAll()).sort((a, b) => String(b.updatedAt).localeCompare(String(a.updatedAt)));
}

export function getDraft(id) {
    return readAll()[id] || null;
}

export function saveDraft(draft) {
    const sheets = readAll();
    const saved = { ...draft, updatedAt: new Date().toISOString() };
    sheets[draft.id] = saved;
    writeAll(sheets);
    return saved;
}

export function deleteDraft(id) {
    const sheets = readAll();
    delete sheets[id];
    writeAll(sheets);
}

/**
 * Start a dual with a full fourteen-bout card.
 *
 * Every weight is laid out up front, in the order they will be wrestled, so a
 * scorer never has to add a row mid-dual -- they only fill one in.
 */
export function createDraft({ matchDate, opponentSchool, opponentSchoolId = null, venue = 'Home', startingWeight = null }) {
    const now = new Date().toISOString();
    const order = startingWeight ? boutOrder(startingWeight) : [...WEIGHT_CLASSES];

    return {
        id: draftId(),
        version: SCHEMA_VERSION,
        createdAt: now,
        updatedAt: now,
        matchDate,
        opponentSchool,
        opponentSchoolId,
        venue,
        startingWeight: startingWeight ? Number(startingWeight) : null,
        status: STATUS_IN_PROGRESS,
        bouts: order.map(createBout),
        /** Filled in at submit, from the official scorer's book. */
        officialOurScore: null,
        officialOpponentScore: null,
    };
}

/**
 * A JSON copy of one sheet.
 *
 * An escape hatch worth having while this is the only copy: a scorer can hand
 * off a dual, or keep it, without waiting for the API.
 */
export function exportDraft(draft) {
    const blob = new Blob([JSON.stringify(draft, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `scoresheet-${draft.opponentSchool || 'dual'}-${draft.matchDate}.json`.replace(/\s+/g, '-');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}
