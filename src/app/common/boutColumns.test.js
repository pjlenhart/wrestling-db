import { compareScores, fallTime, formatScore, newestFirst } from './boutColumns';

const bout = (match_stats) => ({ match_stats });

describe('formatScore', () => {
    it('shows a dual meet score from total_points, ours first', () => {
        expect(formatScore(bout({ total_points_for: 8, total_points_against: 3 }))).toBe('8–3');
    });

    it('shows a postseason score from points', () => {
        expect(formatScore(bout({ points_for: 0, points_against: 7 }))).toBe('0–7');
    });

    it('leaves a forfeit stored as 0-0 blank', () => {
        expect(
            formatScore(bout({ method_of_result: 'Forfeit', total_points_for: 0, total_points_against: 0 })),
        ).toBe('');
    });

    it('keeps a real score on a bout that ended in a forfeit', () => {
        expect(
            formatScore(bout({ method_of_result: 'Forfeit', total_points_for: 7, total_points_against: 2 })),
        ).toBe('7–2');
    });

    it('is blank with no score', () => {
        expect(formatScore(bout({}))).toBe('');
        expect(formatScore(null)).toBe('');
    });
});

describe('compareScores', () => {
    it('orders by margin, then by points scored', () => {
        const scores = ['8–3', '15–0', '2–4', '', '6–1'];
        expect([...scores].sort(compareScores)).toEqual(['', '2–4', '6–1', '8–3', '15–0']);
    });
});

describe('fallTime', () => {
    it('shows a fall time as m:ss', () => {
        expect(fallTime(bout({ match_time: '00:03:42' }))).toBe('3:42');
        expect(fallTime(bout({ match_time: '00:00:38' }))).toBe('0:38');
    });

    it('is blank for the all-zero placeholder or no time', () => {
        expect(fallTime(bout({ match_time: '00:00:00' }))).toBe('');
        expect(fallTime(bout({}))).toBe('');
    });
});

describe('newestFirst', () => {
    it('puts the latest date first, and the later bout first on the same day', () => {
        const bouts = [
            { match_id: 1, match_date: '2024-12-05' },
            { match_id: 7, match_date: '2026-02-21' },
            { match_id: 5, match_date: '2026-02-21T00:00:00.000Z' },
            { match_id: 3, match_date: '2025-01-10' },
        ];
        expect(newestFirst(bouts).map((b) => b.match_id)).toEqual([7, 5, 3, 1]);
        expect(bouts[0].match_id).toBe(1); // the original is left alone
    });
});
