/**
 * The same conformance fixture the backend runs.
 *
 * Generated from the node project's engine (`npm run conformance:generate`
 * there, which writes both copies). This suite asserts that the port used to
 * show a running score at the table agrees, bout for bout, with the engine that
 * decides what actually goes into the database.
 *
 * If this fails, do not edit the fixture to match -- work out which engine
 * changed, and why.
 */

import { deriveLiveDual } from './liveBout';
import fixture from './__fixtures__/conformance.json';

describe(`scoring conformance (${fixture.cases.length} shared cases)`, () => {
    it.each(fixture.cases.map((testCase) => [testCase.name, testCase]))(
        '%s',
        (_name, testCase) => {
            const derived = deriveLiveDual(testCase.sheet);
            const expected = testCase.expected;

            expect(derived.ourScore).toBe(expected.ourScore);
            expect(derived.opponentScore).toBe(expected.opponentScore);
            expect(derived.decidedCount).toBe(expected.decidedCount);
            expect(derived.errors).toHaveLength(expected.errors);
            expect(derived.warnings).toHaveLength(expected.warnings);

            expect(
                derived.insertable.map((bout) => bout.weight).sort((a, b) => a - b),
            ).toEqual(expected.insertable);

            const actual = derived.bouts
                .slice()
                .sort((a, b) => a.weight - b.weight)
                .map((bout) => ({
                    weight: bout.weight,
                    method: bout.method,
                    period: bout.period,
                    result: bout.result,
                    teamPointsFor: bout.teamPointsFor,
                    teamPointsAgainst: bout.teamPointsAgainst,
                    pointMargin: bout.pointMargin,
                    weForfeited: bout.weForfeited,
                    ours: bout.ours,
                    theirs: bout.theirs,
                }));

            expect(actual).toEqual(expected.bouts);
        },
    );
});
