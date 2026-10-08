import {
    seasonStartYear,
    seasonMonths,
    initialMonthIndex,
    monthWeeks,
    eventsByDay,
    formatTime,
    formatEventDates,
    teamSlug,
} from './calendar';

describe('seasonStartYear', () => {
    it('looks ahead to the coming season from August', () => {
        expect(seasonStartYear(new Date(2026, 7, 1))).toBe(2026);
        expect(seasonStartYear(new Date(2026, 9, 8))).toBe(2026);
        expect(seasonStartYear(new Date(2026, 11, 31))).toBe(2026);
    });

    it('keeps the season that started last November through July', () => {
        expect(seasonStartYear(new Date(2027, 0, 1))).toBe(2026);
        expect(seasonStartYear(new Date(2027, 2, 31))).toBe(2026);
        expect(seasonStartYear(new Date(2027, 6, 31))).toBe(2026);
    });
});

describe('seasonMonths', () => {
    it('runs November through March across the new year', () => {
        expect(seasonMonths(2026).map((m) => `${m.short} ${m.year}`)).toEqual([
            'Nov 2026', 'Dec 2026', 'Jan 2027', 'Feb 2027', 'Mar 2027',
        ]);
    });
});

describe('initialMonthIndex', () => {
    const months = seasonMonths(2026);

    it('opens on November before the season', () => {
        expect(initialMonthIndex(months, new Date(2026, 9, 8))).toBe(0);
    });

    it('opens on the current month during the season', () => {
        expect(initialMonthIndex(months, new Date(2026, 11, 15))).toBe(1);
        expect(initialMonthIndex(months, new Date(2027, 1, 1))).toBe(3);
    });

    it('stays on March once the season is over', () => {
        expect(initialMonthIndex(months, new Date(2027, 4, 20))).toBe(4);
    });
});

describe('monthWeeks', () => {
    it('starts on the right weekday and pads full weeks', () => {
        // December 1, 2026 is a Tuesday.
        const weeks = monthWeeks(2026, 11);
        expect(weeks[0]).toEqual([null, null, 1, 2, 3, 4, 5]);
        expect(weeks.every((w) => w.length === 7)).toBe(true);
        expect(weeks.flat().filter(Boolean)).toHaveLength(31);
    });

    it('handles February', () => {
        expect(monthWeeks(2027, 1).flat().filter(Boolean)).toHaveLength(28);
    });
});

describe('eventsByDay', () => {
    const event = (fields) => ({
        team: 'Varsity',
        event_type: 'Dual Meet',
        end_date: null,
        start_time: null,
        ...fields,
    });

    it('keeps two events on the same day as separate items', () => {
        const byDay = eventsByDay([
            event({ event_id: 1, event_date: '2026-12-04', team: 'Girls' }),
            event({ event_id: 2, event_date: '2026-12-04', event_type: 'Bracket Tournament' }),
        ]);
        expect(byDay.get('2026-12-04').map((e) => e.event.event_id)).toEqual([2, 1]);
    });

    it('puts a multi-day event on every day it covers', () => {
        const byDay = eventsByDay([
            event({ event_id: 1, event_date: '2026-12-04', end_date: '2026-12-05' }),
        ]);
        expect(byDay.get('2026-12-04')[0]).toMatchObject({ day: 1, days: 2 });
        expect(byDay.get('2026-12-05')[0]).toMatchObject({ day: 2, days: 2 });
        expect(byDay.has('2026-12-06')).toBe(false);
    });

    it('spans a month boundary', () => {
        const byDay = eventsByDay([
            event({ event_id: 1, event_date: '2026-12-31', end_date: '2027-01-01' }),
        ]);
        expect(byDay.has('2026-12-31')).toBe(true);
        expect(byDay.has('2027-01-01')).toBe(true);
    });

    it('treats an end date before the start as a single day', () => {
        const byDay = eventsByDay([
            event({ event_id: 1, event_date: '2026-12-04', end_date: '2026-12-01' }),
        ]);
        expect(byDay.size).toBe(1);
    });

    it('caps a runaway end date', () => {
        const byDay = eventsByDay([
            event({ event_id: 1, event_date: '2026-12-01', end_date: '2027-12-01' }),
        ]);
        expect(byDay.size).toBe(7);
    });

    it('orders by start time, untimed last', () => {
        const byDay = eventsByDay([
            event({ event_id: 1, event_date: '2026-12-02' }),
            event({ event_id: 2, event_date: '2026-12-02', start_time: '18:00' }),
            event({ event_id: 3, event_date: '2026-12-02', start_time: '16:30', team: 'JV' }),
        ]);
        expect(byDay.get('2026-12-02').map((e) => e.event.event_id)).toEqual([3, 2, 1]);
    });
});

describe('no practice days', () => {
    it('lead the day ahead of timed events', () => {
        const byDay = eventsByDay([
            { event_id: 1, event_date: '2026-11-26', team: 'Varsity', event_type: 'Practice', start_time: '15:00' },
            { event_id: 2, event_date: '2026-11-26', team: 'All Teams', event_type: 'No Practice', start_time: null },
        ]);
        expect(byDay.get('2026-11-26').map((e) => e.event.event_id)).toEqual([2, 1]);
    });
});

describe('teamSlug', () => {
    it('makes team names safe for class names', () => {
        expect(teamSlug('All Teams')).toBe('all-teams');
        expect(teamSlug('JV')).toBe('jv');
    });
});

describe('formatTime', () => {
    it('formats 24-hour times', () => {
        expect(formatTime('16:30')).toBe('4:30 PM');
        expect(formatTime('09:00')).toBe('9:00 AM');
        expect(formatTime('12:00')).toBe('12:00 PM');
        expect(formatTime('00:15')).toBe('12:15 AM');
    });

    it('is empty without a time', () => {
        expect(formatTime(null)).toBe('');
    });
});

describe('formatEventDates', () => {
    it('shows a range for multi-day events', () => {
        expect(formatEventDates({ event_date: '2026-12-04', end_date: '2026-12-05' })).toBe(
            'Fri, Dec 4 – Sat, Dec 5'
        );
        expect(formatEventDates({ event_date: '2026-12-04', end_date: null })).toBe('Fri, Dec 4');
    });
});
