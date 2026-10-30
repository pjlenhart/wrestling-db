// The scoring breakdown -- takedowns, reversals, escapes, near falls and
// penalties -- which dual meet matches always have and postseason matches
// sometimes do. Both come from the API under the same names in `match_stats`,
// so the tables for either kind of match share these column definitions.

// A match without a breakdown is not a breakdown of zeros. Anything that adds
// these numbers up, or averages them per match, must skip it.
export const hasBreakdown = (match) => Boolean(match?.match_stats?.has_breakdown);

// Adds up the scoring breakdown across matches, which should already be only
// the ones that have one. Dual meets keep the score in total_points_*,
// postseason matches in points_*.
export const sumBreakdowns = (matches) => {
    const stats = {
        takedowns_for: 0,
        takedowns_against: 0,
        reversals_for: 0,
        reversals_against: 0,
        escapes_for: 0,
        escapes_against: 0,
        nearfall_for: 0,
        nearfall_against: 0,
        penalties_for: 0,
        penalties_against: 0,
        takedown_points_for: 0,
        takedown_points_against: 0,
        reversal_points_for: 0,
        reversal_points_against: 0,
        escape_points_for: 0,
        escape_points_against: 0,
        nearfall_points_for: 0,
        nearfall_points_against: 0,
        penalty_points_for: 0,
        penalty_points_against: 0,
        total_points_for: 0,
        total_points_against: 0,
    };

    matches.forEach((match) => {
        const ms = match.match_stats || {};
        const escapesFor = Number(ms.escapes_for) || 0;
        const escapesAgainst = Number(ms.escapes_against) || 0;

        stats.takedowns_for += Number(ms.takedowns_for) || 0;
        stats.takedowns_against += Number(ms.takedowns_against) || 0;
        stats.reversals_for += Number(ms.reversals_for) || 0;
        stats.reversals_against += Number(ms.reversals_against) || 0;
        stats.escapes_for += escapesFor;
        stats.escapes_against += escapesAgainst;
        stats.nearfall_for += Number(ms.nearfall_for) || 0;
        stats.nearfall_against += Number(ms.nearfall_against) || 0;
        stats.penalties_for += Number(ms.penalties_for) || 0;
        stats.penalties_against += Number(ms.penalties_against) || 0;
        stats.takedown_points_for += Number(ms.takedown_points_for) || 0;
        stats.takedown_points_against +=
            Number(ms.takedown_points_against) || 0;
        stats.reversal_points_for += Number(ms.reversal_points_for) || 0;
        stats.reversal_points_against +=
            Number(ms.reversal_points_against) || 0;
        // Escape points: use stored value if available, otherwise calculate (1 point per escape)
        stats.escape_points_for +=
            Number(ms.escape_points_for) || escapesFor;
        stats.escape_points_against +=
            Number(ms.escape_points_against) || escapesAgainst;
        stats.nearfall_points_for += Number(ms.nearfall_points_for) || 0;
        stats.nearfall_points_against +=
            Number(ms.nearfall_points_against) || 0;
        stats.penalty_points_for += Number(ms.penalty_points_for) || 0;
        stats.penalty_points_against +=
            Number(ms.penalty_points_against) || 0;
        stats.total_points_for +=
            Number(ms.total_points_for ?? ms.points_for) || 0;
        stats.total_points_against +=
            Number(ms.total_points_against ?? ms.points_against) || 0;
    });

    return stats;
};

// One line per scoring action for a single match: how many times it happened
// and what it was worth, each way. Only meaningful when the match has a
// breakdown. Escapes fall back to a point apiece, as in sumBreakdowns.
const ACTIONS = [
    ['Takedowns', 'takedowns', 'takedown_points'],
    ['Reversals', 'reversals', 'reversal_points'],
    ['Escapes', 'escapes', 'escape_points'],
    ['Near falls', 'nearfall', 'nearfall_points'],
    ['Penalties', 'penalties', 'penalty_points'],
];

export const breakdownRows = (match) => {
    const ms = match?.match_stats || {};
    const count = (field) => Number(ms[field]) || 0;
    return ACTIONS.map(([label, counts, points]) => {
        const forCount = count(`${counts}_for`);
        const againstCount = count(`${counts}_against`);
        const fallback = counts === 'escapes';
        return {
            label,
            for: forCount,
            forPoints: count(`${points}_for`) || (fallback ? forCount : 0),
            against: againstCount,
            againstPoints: count(`${points}_against`) || (fallback ? againstCount : 0),
        };
    });
};
