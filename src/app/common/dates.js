/**
 * Reading calendar dates from the API.
 *
 * The API sends match dates as plain calendar days -- '2021-12-07'. Passing one
 * to `new Date()` does not mean what it looks like: a date-only string is
 * parsed as **UTC midnight** per the ECMAScript spec, so anywhere west of
 * Greenwich it renders as the day before. In New York a match on the 7th shows
 * as the 6th, all year round.
 *
 * Building the date from its parts sidesteps the parser entirely and produces
 * local midnight on the day that was actually stored.
 */

const CALENDAR_DATE = /^(\d{4})-(\d{2})-(\d{2})/;

/**
 * Parse a calendar date into a local Date, or null if there isn't one.
 *
 * Accepts what the API actually returns in either shape: a bare '2021-12-07',
 * or a full timestamp like '2021-12-07T00:00:00.000Z' from a driver that
 * hydrated the column into a Date before serialising it. Only the calendar
 * portion is used, which is the whole point -- the time never meant anything.
 */
export function parseCalendarDate(value) {
    if (!value) return null;
    if (value instanceof Date) return Number.isNaN(value.getTime()) ? null : value;

    const match = CALENDAR_DATE.exec(String(value));
    if (!match) {
        const fallback = new Date(value);
        return Number.isNaN(fallback.getTime()) ? null : fallback;
    }

    const [, year, month, day] = match;
    return new Date(Number(year), Number(month) - 1, Number(day));
}

/** A calendar date as 'M/D/YYYY', or an empty string. */
export function formatCalendarDate(value) {
    const date = parseCalendarDate(value);
    return date ? date.toLocaleDateString('en-US') : '';
}

const dates = { parseCalendarDate, formatCalendarDate };

export default dates;
