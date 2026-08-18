import {
    deriveBout,
    deriveDual,
    parseCell,
    rulesForSeason,
    seasonForDate,
    MAJOR_DECISION,
    MINOR_DECISION,
    TECH_FALL,
    PIN,
    FORFEIT,
    DOUBLE_FORFEIT,
    DISQUALIFICATION,
} from './scoring';

const CURRENT = rulesForSeason('2025-2026');

describe('seasons', () => {
    it('puts a January date in the season that started the prior year', () => {
        expect(seasonForDate(new Date('2026-01-08'))).toBe('2025-2026');
    });

    it('puts a November date in the season that just started', () => {
        expect(seasonForDate(new Date('2025-11-20'))).toBe('2025-2026');
    });

    it('uses 3-point takedowns from 2024-2025 on, and 2 before', () => {
        expect(rulesForSeason('2025-2026').takedownPoints).toBe(3);
        expect(rulesForSeason('2024-2025').takedownPoints).toBe(3);
        expect(rulesForSeason('2023-2024').takedownPoints).toBe(2);
    });
});

describe('parseCell', () => {
    it('splits on whitespace and commas, case-insensitively', () => {
        expect(parseCell('T3 n4,e1').map((t) => [t.category, t.points])).toEqual([
            ['T', 3],
            ['N', 4],
            ['E', 1],
        ]);
    });

    it('treats Pin as terminal rather than scoring', () => {
        const [token] = parseCell('Pin');
        expect(token.terminal).toBe(PIN);
        expect(token.points).toBe(0);
    });

    it('discards cautions and warnings', () => {
        expect(parseCell('C W')).toEqual([]);
    });

    it('refuses riding time rather than silently dropping the point', () => {
        expect(() => parseCell('RT1')).toThrow(/riding time/);
    });

    it('rejects anything it does not recognize', () => {
        expect(() => parseCell('X9')).toThrow(/unrecognized/);
    });
});

describe('deriveBout', () => {
    it('scores a decision from the tokens', () => {
        const bout = deriveBout(
            { weight: 138, wrestler: 'Ethan Grace', opponent: 'Adam Fenante', ours: { 1: 'T3', 2: 'E1' }, theirs: { 2: 'T3' } },
            CURRENT,
        );
        expect(bout.ours.takedownPoints).toBe(3);
        expect(bout.ours.escapePoints).toBe(1);
        expect(bout.pointMargin).toBe(1);
        expect(bout.method).toBe(MINOR_DECISION);
        expect(bout.result).toBe('Win');
        expect(bout.teamPointsFor).toBe(3);
    });

    it('lets a pin decide the bout even when the pinner trails on points', () => {
        const bout = deriveBout(
            { weight: 150, wrestler: 'Nick Young', opponent: 'Clay Reynolds', ours: { 3: 'Pin' }, theirs: { 1: 'T3 N4 N4' } },
            CURRENT,
        );
        expect(bout.method).toBe(PIN);
        expect(bout.result).toBe('Win');
        expect(bout.teamPointsFor).toBe(6);
        expect(bout.period).toBe('3rd');
    });

    it('calls a major decision at a margin of 8', () => {
        const bout = deriveBout(
            { weight: 165, wrestler: 'Us', opponent: 'Them', ours: { 1: 'T3 T3 N2' } },
            CURRENT,
        );
        expect(bout.pointMargin).toBe(8);
        expect(bout.method).toBe(MAJOR_DECISION);
        expect(bout.teamPointsFor).toBe(4);
    });

    it('calls a tech fall at a margin of 15', () => {
        const bout = deriveBout(
            { weight: 175, wrestler: 'Us', opponent: 'Them', ours: { 1: 'T3 T3 T3 N3 N3' } },
            CURRENT,
        );
        expect(bout.pointMargin).toBe(15);
        expect(bout.method).toBe(TECH_FALL);
        expect(bout.teamPointsFor).toBe(5);
    });

    it('takes the period from the column the mark sits in', () => {
        const bout = deriveBout(
            { weight: 120, wrestler: 'Us', opponent: 'Them', ours: { SV: 'T3' }, theirs: { 1: 'E1' } },
            CURRENT,
        );
        expect(bout.period).toBe('OT1');
    });

    it('gives six team points for an opponent forfeit and zeroes the stat line', () => {
        const bout = deriveBout({ weight: 106, wrestler: 'Simon Datwin', opponent: 'FF' }, CURRENT);
        expect(bout.method).toBe(FORFEIT);
        expect(bout.teamPointsFor).toBe(6);
        expect(bout.ours.takedowns).toBe(0);
        expect(bout.weForfeited).toBe(false);
    });

    it('flags our own forfeit so it can be dropped before insert', () => {
        const bout = deriveBout({ weight: 106, wrestler: 'FF', opponent: 'Someone' }, CURRENT);
        expect(bout.weForfeited).toBe(true);
        expect(bout.teamPointsAgainst).toBe(6);
    });

    it('awards nothing to either team on a double forfeit', () => {
        const bout = deriveBout({ weight: 106, forfeitedBy: 'both' }, CURRENT);
        expect(bout.method).toBe(DOUBLE_FORFEIT);
        expect(bout.teamPointsFor).toBe(0);
        expect(bout.teamPointsAgainst).toBe(0);
        expect(bout.result).toBeNull();
        // Neither wrestler competed, so there is nothing to record for ours.
        expect(bout.weForfeited).toBe(true);
    });

    it('still refuses two blank lines that were not flagged a double forfeit', () => {
        expect(() => deriveBout({ weight: 106, wrestler: '', opponent: '' }, CURRENT)).toThrow(
            /double forfeit/,
        );
    });

    it('refuses a disqualification with no explicit winner', () => {
        expect(() =>
            deriveBout(
                { weight: 132, wrestler: 'Us', opponent: 'Them', method: DISQUALIFICATION, ours: { 1: 'T3' } },
                CURRENT,
            ),
        ).toThrow(/requires an explicit winner/);
    });

    it('honours an explicit winner for a disqualification', () => {
        const bout = deriveBout(
            {
                weight: 132,
                wrestler: 'Us',
                opponent: 'Them',
                method: DISQUALIFICATION,
                winner: 'theirs',
                ours: { 1: 'T3' },
            },
            CURRENT,
        );
        expect(bout.result).toBe('Loss');
        expect(bout.teamPointsAgainst).toBe(6);
    });

    it('warns when a takedown is written at the wrong value for the era', () => {
        const bout = deriveBout({ weight: 144, wrestler: 'Us', opponent: 'Them', ours: { 1: 'T2' } }, CURRENT);
        expect(bout.warnings.join(' ')).toMatch(/3-point takedowns/);
    });

    it('warns rather than guessing when the bout is tied', () => {
        const bout = deriveBout(
            { weight: 144, wrestler: 'Us', opponent: 'Them', ours: { 1: 'T3' }, theirs: { 1: 'T3' } },
            CURRENT,
        );
        expect(bout.warnings.join(' ')).toMatch(/winner cannot be determined/);
    });
});

describe('deriveDual', () => {
    const date = new Date('2026-01-08');

    it('totals team points across the card', () => {
        const result = deriveDual(
            [
                { weight: 106, wrestler: 'A', opponent: 'FF' },
                { weight: 113, wrestler: 'B', opponent: 'Z', ours: { 1: 'Pin' } },
                { weight: 120, wrestler: 'C', opponent: 'Y', theirs: { 1: 'T3' } },
            ],
            date,
        );
        expect(result.ourScore).toBe(12);
        expect(result.opponentScore).toBe(3);
        expect(result.errors).toEqual([]);
    });

    it('counts our forfeit in the totals but keeps it out of insertable', () => {
        const result = deriveDual(
            [
                { weight: 106, wrestler: 'FF', opponent: 'Z' },
                { weight: 113, wrestler: 'B', opponent: 'Y', ours: { 1: 'Pin' } },
            ],
            date,
        );
        expect(result.opponentScore).toBe(6);
        expect(result.ourScore).toBe(6);
        expect(result.insertable).toHaveLength(1);
        expect(result.insertable[0].weight).toBe(113);
    });

    it('collects a bad bout as an error instead of throwing the whole dual away', () => {
        const result = deriveDual(
            [
                { weight: 106, wrestler: '', opponent: '' },
                { weight: 113, wrestler: 'B', opponent: 'Y', ours: { 1: 'Pin' } },
            ],
            date,
        );
        expect(result.errors).toHaveLength(1);
        expect(result.ourScore).toBe(6);
    });
});
