import {
    BOUT_FINAL,
    SIDE_BOTH,
    SIDE_OURS,
    SIDE_THEIRS,
    addEvent,
    boutOrder,
    boutReadiness,
    boutScore,
    createBout,
    deriveLiveDual,
    describeToken,
    eventsToCells,
    rulesForDate,
    undoLastEvent,
} from './liveBout';

const RULES = rulesForDate('2026-01-08');

const draftWith = (bouts) => ({ matchDate: '2026-01-08', bouts });

const scored = (weight, wrestler, opponent, events) => {
    let bout = { ...createBout(weight), wrestler, opponent };
    for (const [side, period, token] of events) bout = addEvent(bout, { side, period, token });
    return { ...bout, status: BOUT_FINAL };
};

describe('bout order', () => {
    it('runs the ladder from the drawn weight and wraps', () => {
        const order = boutOrder(113);
        expect(order[0]).toBe(113);
        expect(order[order.length - 1]).toBe(106);
        expect(order).toHaveLength(14);
    });

    it('starts at 106 with no draw', () => {
        expect(boutOrder(null)[0]).toBe(106);
    });
});

describe('events', () => {
    it('folds taps into the period cells the engine reads', () => {
        let bout = createBout(138);
        bout = addEvent(bout, { side: SIDE_OURS, period: '1', token: 'T3' });
        bout = addEvent(bout, { side: SIDE_OURS, period: '1', token: 'N4' });
        bout = addEvent(bout, { side: SIDE_THEIRS, period: '2', token: 'E1' });

        expect(eventsToCells(bout.events)).toEqual({ ours: { 1: 'T3 N4' }, theirs: { 2: 'E1' } });
        expect(boutScore(bout)).toEqual({ ours: 7, theirs: 1 });
    });

    it('undoes the most recent tap', () => {
        let bout = createBout(138);
        bout = addEvent(bout, { side: SIDE_OURS, period: '1', token: 'T3' });
        bout = addEvent(bout, { side: SIDE_OURS, period: '1', token: 'E1' });
        expect(boutScore(undoLastEvent(bout)).ours).toBe(3);
    });

    it('reads a token back in words', () => {
        expect(describeToken('T3', RULES)).toBe('Takedown +3');
        expect(describeToken('Pin', RULES)).toBe('Wins by pin / fall');
    });
});

describe('readiness', () => {
    it('will not let a nameless bout be scored', () => {
        expect(boutReadiness(createBout(106)).ready).toBe(false);
    });

    it('accepts a bout once a forfeit is declared', () => {
        expect(boutReadiness({ ...createBout(106), forfeit: SIDE_OURS }).ready).toBe(true);
    });

    it('accepts a bout once both names are in', () => {
        expect(boutReadiness({ ...createBout(106), wrestler: 'A', opponent: 'B' }).ready).toBe(true);
    });
});

describe('deriveLiveDual', () => {
    it('ignores bouts nobody has wrestled yet', () => {
        const dual = deriveLiveDual(draftWith([createBout(106), createBout(113)]));
        expect(dual.ourScore).toBe(0);
        expect(dual.decidedCount).toBe(0);
        expect(dual.errors).toEqual([]);
    });

    /**
     * The trap this guards: an empty line reads as a forfeit to the engine, so
     * a bout finalised before the names were filled in used to score six points
     * to the opponent while looking like a legitimate result.
     */
    it('refuses to score a finalised bout whose wrestler was never chosen', () => {
        const bout = scored(106, '', 'J. Ramos', [[SIDE_OURS, '1', 'Pin']]);
        const dual = deriveLiveDual(draftWith([bout]));

        expect(dual.ourScore).toBe(0);
        expect(dual.opponentScore).toBe(0);
        expect(dual.decidedCount).toBe(0);
        expect(dual.errors.join(' ')).toMatch(/choose our wrestler/);
    });

    it('scores a pin to the side the mark sits on', () => {
        const bout = scored(106, 'S. Datwin', 'J. Ramos', [
            [SIDE_THEIRS, '1', 'T3'],
            [SIDE_OURS, '2', 'Pin'],
        ]);
        const dual = deriveLiveDual(draftWith([bout]));

        expect(dual.ourScore).toBe(6);
        expect(dual.opponentScore).toBe(0);
        expect(dual.byWeight[106].method).toBe('Pin');
        expect(dual.byWeight[106].period).toBe('2nd');
    });

    it('gives a declared forfeit six points without needing names', () => {
        const bout = { ...createBout(120), wrestler: 'B. Lawson', forfeit: SIDE_THEIRS, status: BOUT_FINAL };
        expect(deriveLiveDual(draftWith([bout])).ourScore).toBe(6);
    });

    /**
     * The bug this guards: a bout we conceded, where nobody recorded who the
     * opponent would have been, used to reach the engine as two blank lines and
     * score nothing -- so the opponent silently lost the six points owed them.
     */
    it('awards six to the opponent when we forfeit and no opponent was named', () => {
        const bout = { ...createBout(126), forfeit: SIDE_OURS, status: BOUT_FINAL };
        const dual = deriveLiveDual(draftWith([bout]));

        expect(dual.opponentScore).toBe(6);
        expect(dual.ourScore).toBe(0);
        expect(dual.errors).toEqual([]);
        expect(dual.insertable).toHaveLength(0);
    });

    it('awards six to us when they forfeit and no wrestler was named', () => {
        const bout = { ...createBout(132), forfeit: SIDE_THEIRS, status: BOUT_FINAL };
        const dual = deriveLiveDual(draftWith([bout]));

        expect(dual.ourScore).toBe(6);
        expect(dual.errors).toEqual([]);
    });

    it('awards nothing on a double forfeit', () => {
        const bout = { ...createBout(126), forfeit: SIDE_BOTH, status: BOUT_FINAL };
        const dual = deriveLiveDual(draftWith([bout]));

        expect(dual.ourScore).toBe(0);
        expect(dual.opponentScore).toBe(0);
        expect(dual.errors).toEqual([]);
        expect(dual.insertable).toHaveLength(0);
    });
});
