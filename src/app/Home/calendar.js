/**
 * Date logic for the home page season calendar.
 *
 * A season runs November through March and is named by the year it starts in:
 * season 2026 is Nov 2026 - Mar 2027. Kept free of React so it can be tested
 * on its own.
 */
import { parseCalendarDate } from '../common/dates';

const NOVEMBER = 10;
const MONTH_NAMES = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December',
];

// A typo'd end date a year out would otherwise paint every day in between.
const MAX_EVENT_DAYS = 7;

export const TEAMS = ['All Teams', 'Varsity', 'JV', 'Girls'];

export const NO_PRACTICE = 'No Practice';

export const isNoPractice = (event) => event.event_type === NO_PRACTICE;

/** A team name as a CSS-safe slug: 'All Teams' -> 'all-teams'. */
export function teamSlug(team) {
    return String(team).toLowerCase().replace(/[^a-z0-9]+/g, '-');
}

/**
 * The season to show on a given day. August onward looks ahead to the season
 * starting that November; January through July is the season that started the
 * previous November, so it stays up after it ends rather than going blank.
 */
export function seasonStartYear(today = new Date()) {
    return today.getMonth() >= 7 ? today.getFullYear() : today.getFullYear() - 1;
}

/** The five months of a season, in order. `month` is 0-based like Date. */
export function seasonMonths(startYear) {
    return [0, 1, 2, 3, 4].map((offset) => {
        const month = (NOVEMBER + offset) % 12;
        const year = month >= NOVEMBER ? startYear : startYear + 1;
        return { year, month, name: MONTH_NAMES[month], short: MONTH_NAMES[month].slice(0, 3) };
    });
}

/**
 * Which month to open on: this month during the season, November before it
 * starts, and March once it is over.
 */
export function initialMonthIndex(months, today = new Date()) {
    const index = months.findIndex(
        (m) => m.year === today.getFullYear() && m.month === today.getMonth()
    );
    if (index !== -1) return index;
    const first = months[0];
    const beforeSeason = today < new Date(first.year, first.month, 1);
    return beforeSeason ? 0 : months.length - 1;
}

/** Calendar weeks (Sunday first) as day-of-month numbers, padded with null. */
export function monthWeeks(year, month) {
    const leading = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const cells = [
        ...Array(leading).fill(null),
        ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
    ];
    while (cells.length % 7) cells.push(null);

    const weeks = [];
    for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
    return weeks;
}

/** A local Date as 'YYYY-MM-DD', the key events are grouped under. */
export function dayKey(date) {
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${date.getFullYear()}-${mm}-${dd}`;
}

function compareEvents(a, b) {
    // A day off leads the day, since it changes what the rest of it means.
    // Then untimed events sort after timed ones, then by team so a day reads
    // the same way every time.
    const offA = isNoPractice(a.event);
    const offB = isNoPractice(b.event);
    if (offA !== offB) return offA ? -1 : 1;
    const timeA = a.event.start_time || '99:99';
    const timeB = b.event.start_time || '99:99';
    if (timeA !== timeB) return timeA < timeB ? -1 : 1;
    return TEAMS.indexOf(a.event.team) - TEAMS.indexOf(b.event.team);
}

/**
 * Spread events across every day they cover. Returns a Map of day key to a
 * list of `{ event, day, days }`, where `day` is 1-based within a multi-day
 * event and `days` is its length.
 */
export function eventsByDay(events) {
    const byDay = new Map();
    events.forEach((event) => {
        const start = parseCalendarDate(event.event_date);
        if (!start) return;
        const end = parseCalendarDate(event.end_date);
        let days = 1;
        if (end && end > start) {
            // Count calendar days, not 24h blocks -- DST would make one short.
            days = Math.round((end - start) / 86400000) + 1;
        }
        days = Math.min(days, MAX_EVENT_DAYS);

        for (let day = 1; day <= days; day++) {
            const date = new Date(start.getFullYear(), start.getMonth(), start.getDate() + day - 1);
            const key = dayKey(date);
            if (!byDay.has(key)) byDay.set(key, []);
            byDay.get(key).push({ event, day, days });
        }
    });
    byDay.forEach((list) => list.sort(compareEvents));
    return byDay;
}

/** '16:30' as '4:30 PM', or an empty string. */
export function formatTime(value) {
    const match = /^(\d{1,2}):(\d{2})/.exec(value || '');
    if (!match) return '';
    const hours = Number(match[1]);
    const suffix = hours >= 12 ? 'PM' : 'AM';
    return `${hours % 12 || 12}:${match[2]} ${suffix}`;
}

/** An event's dates for display: 'Fri, Dec 4' or 'Fri, Dec 4 – Sat, Dec 5'. */
export function formatEventDates(event) {
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    const start = parseCalendarDate(event.event_date);
    if (!start) return '';
    const end = parseCalendarDate(event.end_date);
    const first = start.toLocaleDateString('en-US', options);
    if (!end || end <= start) return first;
    return `${first} – ${end.toLocaleDateString('en-US', options)}`;
}
