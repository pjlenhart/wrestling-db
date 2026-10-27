/**
 * The same tournament fixture the API runs.
 *
 * Hand-written and committed to both repos. If this fails, do not edit the
 * fixture to match -- work out which side changed, and why.
 */

import { deriveTournamentBout, describeResult, parseFallTime } from './tournamentBout';
import fixture from './__fixtures__/tournament.json';

describe('fall times', () => {
    it('reads minutes and seconds into a TIME value', () => {
        expect(parseFallTime('3:42')).toEqual({ time: '00:03:42', error: null });
        expect(parseFallTime('12:05')).toEqual({ time: '00:12:05', error: null });
    });

    it('treats blank as the usual zero and refuses nonsense', () => {
        expect(parseFallTime('')).toEqual({ time: '00:00:00', error: null });
        expect(parseFallTime('3:75').error).toBeTruthy();
        expect(parseFallTime('342').error).toBeTruthy();
    });
});

describe(`tournament fixture (${fixture.cases.length} shared cases)`, () => {
    it.each(fixture.cases.map((testCase) => [testCase.name, testCase]))('%s', (_name, testCase) => {
        const derived = deriveTournamentBout(testCase.sheet);
        const expected = testCase.expected;

        expect(derived.errors).toHaveLength(expected.errors);
        expect({
            record: derived.record,
            result: derived.result,
            method: derived.method,
            period: derived.period,
            pointsFor: derived.pointsFor,
            pointsAgainst: derived.pointsAgainst,
            matchTime: derived.matchTime,
            breakdown: derived.breakdown !== null,
        }).toEqual({
            record: expected.record,
            result: expected.result,
            method: expected.method,
            period: expected.period,
            pointsFor: expected.pointsFor,
            pointsAgainst: expected.pointsAgainst,
            matchTime: expected.matchTime,
            breakdown: expected.breakdown,
        });
    });
});

describe('describing a result', () => {
    it('reads like the bracket does', () => {
        expect(
            describeResult({
                record: true,
                result: 'Win',
                method: 'Major Decision',
                period: '3rd',
                pointsFor: 12,
                pointsAgainst: 3,
            }),
        ).toBe('W, Major Decision 12–3 (3rd)');
    });

    it('says when nothing is recorded', () => {
        expect(describeResult({ record: false })).toBe('Forfeited, nothing recorded');
    });
});
