import { parseCalendarDate, formatCalendarDate } from './dates';

/**
 * These pin the behaviour that caused match dates to render a day early.
 *
 * They only fail in a timezone behind UTC, which is where the bug lived: CI in
 * UTC would have shown nothing wrong. The assertions are written against the
 * calendar fields rather than a formatted string so they hold anywhere.
 */
describe('parseCalendarDate', () => {
    it('keeps the calendar day for a bare date string', () => {
        const date = parseCalendarDate('2021-12-07');
        expect(date.getFullYear()).toBe(2021);
        expect(date.getMonth()).toBe(11);
        expect(date.getDate()).toBe(7);
    });

    it('does not drift a day the way new Date() does', () => {
        // `new Date('2021-12-07')` is UTC midnight, which is the 6th in any
        // timezone behind UTC. This is the entire bug.
        const ours = parseCalendarDate('2021-12-07');
        const naive = new Date('2021-12-07');

        expect(ours.getDate()).toBe(7);
        if (naive.getTimezoneOffset() > 0) {
            expect(naive.getDate()).toBe(6);
            expect(ours.getTime()).not.toBe(naive.getTime());
        }
    });

    it('uses only the calendar part of a full timestamp', () => {
        const date = parseCalendarDate('2026-08-10T00:00:00.000Z');
        expect(date.getFullYear()).toBe(2026);
        expect(date.getMonth()).toBe(7);
        expect(date.getDate()).toBe(10);
    });

    it('passes a Date through unchanged', () => {
        const original = new Date(2024, 0, 15);
        expect(parseCalendarDate(original)).toBe(original);
    });

    it('returns null for nothing usable', () => {
        expect(parseCalendarDate(null)).toBeNull();
        expect(parseCalendarDate('')).toBeNull();
        expect(parseCalendarDate(undefined)).toBeNull();
        expect(parseCalendarDate('not a date')).toBeNull();
    });

    it('handles a leap day and a year boundary', () => {
        expect(parseCalendarDate('2024-02-29').getDate()).toBe(29);
        expect(parseCalendarDate('2026-01-01').getMonth()).toBe(0);
        expect(parseCalendarDate('2025-12-31').getDate()).toBe(31);
    });
});

describe('formatCalendarDate', () => {
    it('formats the stored day, not the day before', () => {
        expect(formatCalendarDate('2021-12-07')).toBe('12/7/2021');
    });

    it('is empty when there is no date', () => {
        expect(formatCalendarDate(null)).toBe('');
    });
});
