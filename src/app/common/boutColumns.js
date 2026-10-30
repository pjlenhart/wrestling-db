// What every bout table shows, whichever page it's on. The scoring breakdown
// isn't a column: it's in the bout's scoresheet or match summary.

// Dual meets keep the score in total_points_*, postseason matches in points_*.
const pointsOf = (ms, side) => ms[`total_points_${side}`] ?? ms[`points_${side}`];

// A forfeit or bye has no score; it's stored as 0-0.
const UNSCORED = ['Forfeit', 'Bye'];

/** "8–3", ours first; '' when the bout has no score to show. */
export const formatScore = (match) => {
    const ms = match?.match_stats || {};
    const ours = pointsOf(ms, 'for');
    const theirs = pointsOf(ms, 'against');
    if (ours == null || theirs == null) return '';
    if (UNSCORED.includes(ms.method_of_result) && !Number(ours) && !Number(theirs)) return '';
    return `${ours}–${theirs}`;
};

const scoreParts = (score) => {
    const m = /^(\d+)–(\d+)$/.exec(score || '');
    return m ? [Number(m[1]), Number(m[2])] : null;
};

/** Biggest win first when sorted descending; bouts with no score sort last. */
export const compareScores = (a, b) => {
    const pa = scoreParts(a);
    const pb = scoreParts(b);
    if (!pa || !pb) return (pa ? 1 : 0) - (pb ? 1 : 0);
    return pa[0] - pa[1] - (pb[0] - pb[1]) || pa[0] - pb[0];
};

/**
 * A fall time as m:ss, or '' when there isn't one. Stored as a TIME,
 * '00:03:42'; most bouts have none, which the column holds as all zeros.
 */
export const fallTime = (match) => {
    const m = /^00:(\d{2}):(\d{2})$/.exec(match?.match_stats?.match_time || '');
    if (!m || (m[1] === '00' && m[2] === '00')) return '';
    return `${Number(m[1])}:${m[2]}`;
};

/**
 * Bouts newest first. Bouts on the same day (a tournament) keep the order they
 * were entered in, latest first, which is the order they were wrestled.
 */
export const newestFirst = (bouts) =>
    [...bouts].sort(
        (a, b) =>
            String(b.match_date).slice(0, 10).localeCompare(String(a.match_date).slice(0, 10)) ||
            (b.match_id ?? 0) - (a.match_id ?? 0),
    );

export const scoreColumn = {
    field: 'score',
    headerName: 'Score',
    width: 80,
    headerAlign: 'center',
    align: 'center',
    valueGetter: (params) => formatScore(params.row),
    sortComparator: compareScores,
};

export const methodColumn = {
    field: 'method_of_result',
    headerName: 'Method',
    minWidth: 125,
    flex: 0.7,
    valueGetter: (params) => params.row.match_stats.method_of_result,
};
