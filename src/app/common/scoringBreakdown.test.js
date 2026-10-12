import { hasBreakdown, sumBreakdowns } from './scoringBreakdown';

// Shaped like the API's `match_stats` for each kind of match.
const dualMeet = {
    match_stats: {
        has_breakdown: true,
        takedowns_for: 2,
        takedowns_against: 1,
        escapes_for: 1,
        escape_points_for: 1,
        takedown_points_for: 6,
        takedown_points_against: 3,
        total_points_for: 7,
        total_points_against: 3,
    },
};

const postseasonWithBreakdown = {
    match_stats: {
        has_breakdown: true,
        takedowns_for: 1,
        takedowns_against: 0,
        escapes_for: 0,
        escape_points_for: 0,
        takedown_points_for: 3,
        takedown_points_against: 0,
        points_for: 3,
        points_against: 0,
    },
};

// Every breakdown field comes back null when one was never entered.
const postseasonWithout = {
    match_stats: {
        has_breakdown: false,
        takedowns_for: null,
        points_for: 12,
        points_against: 4,
    },
};

describe('hasBreakdown', () => {
    it('is true only when the API says the breakdown is there', () => {
        expect(hasBreakdown(dualMeet)).toBe(true);
        expect(hasBreakdown(postseasonWithBreakdown)).toBe(true);
        expect(hasBreakdown(postseasonWithout)).toBe(false);
    });

    it('treats a missing flag or missing stats as no breakdown', () => {
        expect(hasBreakdown({ match_stats: {} })).toBe(false);
        expect(hasBreakdown({})).toBe(false);
        expect(hasBreakdown(undefined)).toBe(false);
    });

    it('reads MySQL 1/0 the same as true/false', () => {
        expect(hasBreakdown({ match_stats: { has_breakdown: 1 } })).toBe(true);
        expect(hasBreakdown({ match_stats: { has_breakdown: 0 } })).toBe(false);
    });
});

describe('sumBreakdowns', () => {
    it('adds dual meet and postseason breakdowns together', () => {
        const stats = sumBreakdowns([dualMeet, postseasonWithBreakdown]);

        expect(stats.takedowns_for).toBe(3);
        expect(stats.takedowns_against).toBe(1);
        expect(stats.takedown_points_for).toBe(9);
    });

    it("takes a postseason match's score from points_for/against", () => {
        const stats = sumBreakdowns([dualMeet, postseasonWithBreakdown]);

        expect(stats.total_points_for).toBe(10);
        expect(stats.total_points_against).toBe(3);
    });

    it('leaves out matches that were filtered for having no breakdown', () => {
        const matches = [dualMeet, postseasonWithout].filter(hasBreakdown);
        const stats = sumBreakdowns(matches);

        // The 12-4 postseason score must not leak into the breakdown totals.
        expect(stats.total_points_for).toBe(7);
        expect(stats.total_points_against).toBe(3);
    });
});
