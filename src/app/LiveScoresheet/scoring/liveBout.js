/**
 * The live bout model.
 *
 * A bout is scored as an append-only list of events -- one per tap -- rather
 * than as editable text. That ordering is what makes undo trustworthy: the last
 * thing entered is the last thing removed, which is how a scorer thinks when
 * the wrong button gets hit mid-scramble.
 *
 * The period cells the scoring engine wants are derived from that list, so what
 * finally gets submitted is exactly the same shape a paper sheet produces.
 */

import { parseCell, PERIOD_ORDER, PERIOD_COLUMNS, deriveDual, rulesForSeason, seasonForDate } from './scoring';

/** The fourteen NFHS classes, in ladder order. */
export const WEIGHT_CLASSES = [106, 113, 120, 126, 132, 138, 144, 150, 157, 165, 175, 190, 215, 285];

export const BOUT_SCHEDULED = 'Scheduled';
export const BOUT_IN_PROGRESS = 'In Progress';
export const BOUT_FINAL = 'Final';

export const SIDE_OURS = 'ours';
export const SIDE_THEIRS = 'theirs';
/** Neither team fielded a wrestler: a double forfeit, worth nothing to anyone. */
export const SIDE_BOTH = 'both';

export { PERIOD_ORDER, PERIOD_COLUMNS };

/**
 * The scoring picklist, built for the season in force.
 *
 * The takedown is the only action whose value moved, so it is the only one that
 * has to be asked for rather than hardcoded.
 */
export function buildScoringActions(rules) {
    return [
        { token: `T${rules.takedownPoints}`, label: 'Takedown', short: 'TD', points: rules.takedownPoints },
        { token: 'E1', label: 'Escape', short: 'ESC', points: 1 },
        { token: 'R2', label: 'Reversal', short: 'REV', points: 2 },
        { token: 'N2', label: 'Near fall 2', short: 'NF2', points: 2 },
        { token: 'N3', label: 'Near fall 3', short: 'NF3', points: 3 },
        { token: 'N4', label: 'Near fall 4', short: 'NF4', points: 4 },
        { token: 'P1', label: 'Penalty 1', short: 'P1', points: 1 },
        { token: 'P2', label: 'Penalty 2', short: 'P2', points: 2 },
    ];
}

/**
 * Marks that end the bout.
 *
 * These land on the line of the wrestler they decided in favour of, the same
 * way they are written on paper -- so the label has to say 'wins by', or a
 * scorer will read 'DQ' as the wrestler who was disqualified.
 */
export const TERMINAL_ACTIONS = [
    { token: 'Pin', label: 'Wins by pin / fall', short: 'PIN' },
    { token: 'DQ', label: 'Wins by disqualification', short: 'DQ' },
    { token: 'Def', label: 'Wins by default (injury)', short: 'DEF' },
];

export function rulesForDate(matchDate) {
    return rulesForSeason(seasonForDate(new Date(matchDate)));
}

export function isTerminalToken(token) {
    return TERMINAL_ACTIONS.some((action) => action.token === token);
}

/**
 * A token in words: 'Takedown +3' rather than 'T3'.
 *
 * The running log reads back to whoever is scoring, so it has to be legible to
 * someone who has not learned the shorthand yet.
 */
export function describeToken(token, rules) {
    const scoring = buildScoringActions(rules).find((action) => action.token === token);
    if (scoring) return `${scoring.label} +${scoring.points}`;

    const terminal = TERMINAL_ACTIONS.find((action) => action.token === token);
    if (terminal) return terminal.label;

    return token;
}

/**
 * Order the ladder from the drawn starting weight, wrapping around.
 *
 * A dual starts at a randomly drawn weight -- the asterisk on the paper sheet --
 * and runs the ladder from there. Without a draw the card is just 106 up.
 */
export function boutOrder(startingWeight) {
    const start = WEIGHT_CLASSES.indexOf(Number(startingWeight));
    if (start <= 0) return [...WEIGHT_CLASSES];
    return [...WEIGHT_CLASSES.slice(start), ...WEIGHT_CLASSES.slice(0, start)];
}

let eventSeq = 0;

function eventId() {
    eventSeq += 1;
    return `ev_${Date.now().toString(36)}_${eventSeq}`;
}

export function createBout(weight) {
    return {
        weight,
        wrestlerId: null,
        wrestler: '',
        opponent: '',
        events: [],
        status: BOUT_SCHEDULED,
        /** 'ours' | 'theirs' | null -- set when a side does not field a wrestler. */
        forfeit: null,
        /** Only needed when the tokens cannot name a winner (DQ, default). */
        winner: null,
        method: null,
    };
}

/** Fold the event list into the period cells the engine reads. */
export function eventsToCells(events) {
    const cells = { ours: {}, theirs: {} };
    for (const event of events || []) {
        const line = cells[event.side];
        if (!line) continue;
        line[event.period] = line[event.period] ? `${line[event.period]} ${event.token}` : event.token;
    }
    return cells;
}

export function addEvent(bout, { side, period, token }) {
    const event = { id: eventId(), side, period, token, at: new Date().toISOString() };
    const status = bout.status === BOUT_SCHEDULED ? BOUT_IN_PROGRESS : bout.status;
    return { ...bout, events: [...bout.events, event], status };
}

export function undoLastEvent(bout) {
    if (!bout.events.length) return bout;
    return { ...bout, events: bout.events.slice(0, -1) };
}

export function removeEvent(bout, eventId_) {
    return { ...bout, events: bout.events.filter((e) => e.id !== eventId_) };
}

/** Points on one side so far, ignoring marks that only end the bout. */
export function sidePoints(cells) {
    let total = 0;
    for (const column of PERIOD_ORDER) {
        let tokens;
        try {
            tokens = parseCell(cells[column]);
        } catch (err) {
            continue;
        }
        for (const token of tokens) {
            if (!token.terminal) total += token.points;
        }
    }
    return total;
}

/** The running score of one bout, safe to call while it is still going. */
export function boutScore(bout) {
    const cells = eventsToCells(bout.events);
    return { ours: sidePoints(cells.ours), theirs: sidePoints(cells.theirs) };
}

/** A bout counts toward the team score once it is final or conceded. */
export function isDecided(bout) {
    return bout.status === BOUT_FINAL || Boolean(bout.forfeit);
}

/**
 * Whether a decided bout can safely be scored.
 *
 * A blank name is not a forfeit. The engine reads an empty line as one, so a
 * bout finalised before the wrestlers were filled in would quietly award six
 * points to the other team -- a wrong answer that looks like a real result and
 * that nobody would catch until the dual did not add up. Forfeits are declared
 * with the forfeit control or they do not happen.
 */
export function boutReadiness(bout) {
    if (bout.forfeit) return { ready: true, reason: null };
    if (!String(bout.wrestler || '').trim()) {
        return { ready: false, reason: 'choose our wrestler, or mark a forfeit' };
    }
    if (!String(bout.opponent || '').trim()) {
        return { ready: false, reason: "enter the opponent's name, or mark a forfeit" };
    }
    return { ready: true, reason: null };
}

/**
 * Translate one live bout into the engine's input shape.
 *
 * The forfeit is passed as a declaration rather than encoded into the names.
 * Writing 'FF' onto the blank line used to mean a bout we conceded, where
 * nobody had recorded an opponent, arrived at the engine as two blank lines and
 * scored nothing for either team.
 */
export function boutToEngineInput(bout) {
    const cells = eventsToCells(bout.events);
    return {
        weight: bout.weight,
        forfeitedBy: bout.forfeit || null,
        wrestler: bout.wrestler,
        opponent: bout.opponent,
        ours: cells.ours,
        theirs: cells.theirs,
        method: bout.method || null,
        winner: bout.winner || null,
    };
}

/**
 * Derive the dual as it stands.
 *
 * Only decided bouts are handed to the engine -- a bout nobody has wrestled yet
 * has two blank lines, which the engine rightly refuses. The running team score
 * is therefore the score so far, not a prediction.
 */
export function deriveLiveDual(draft) {
    const bouts = draft.bouts || [];
    const decided = bouts.filter(isDecided);

    // A decided bout missing a name is held back rather than scored, so a
    // half-filled row can never masquerade as a forfeit.
    const scorable = [];
    const incomplete = [];
    for (const bout of decided) {
        if (boutReadiness(bout).ready) scorable.push(bout);
        else incomplete.push(bout);
    }

    const result = deriveDual(scorable.map(boutToEngineInput), new Date(draft.matchDate));

    const byWeight = {};
    for (const bout of result.bouts) byWeight[bout.weight] = bout;

    return {
        ...result,
        errors: [
            ...result.errors,
            ...incomplete.map((bout) => `${bout.weight}: ${boutReadiness(bout).reason}`),
        ],
        byWeight,
        decidedCount: scorable.length,
        incomplete,
        remaining: bouts.length - scorable.length,
    };
}
