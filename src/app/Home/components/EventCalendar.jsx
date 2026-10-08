import React, { useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Popover from '@mui/material/Popover';
import Skeleton from '@mui/material/Skeleton';
import useMediaQuery from '@mui/material/useMediaQuery';
import EventIcon from '@mui/icons-material/Event';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {
    TEAMS,
    seasonMonths,
    initialMonthIndex,
    monthWeeks,
    eventsByDay,
    dayKey,
    formatTime,
    formatEventDates,
    teamSlug,
    isNoPractice,
} from '../calendar';
import '../styles/eventCalendarStyles.css';

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const teamClass = (team) => `team-${teamSlug(team)}`;

/**
 * Classes for one event: its team color, a home or away background, and the
 * day-off look for No Practice.
 */
const eventClasses = (base, event) => {
    const classes = [base, teamClass(event.team)];
    if (event.venue === 'Home') classes.push(`${base}-home`);
    if (event.venue === 'Away') classes.push(`${base}-away`);
    if (isNoPractice(event)) classes.push(`${base}-off`);
    return classes.join(' ');
};

/** Time, location and home/away, joined with whatever is filled in. */
const eventDetails = (event) =>
    [formatTime(event.start_time), event.location, event.venue].filter(Boolean).join(' · ');

const DayTag = ({ day, days }) =>
    days > 1 ? (
        <span className="event-day-tag">
            Day {day} of {days}
        </span>
    ) : null;

/** One event in a day cell of the month grid. Opens the details popover. */
const EventChip = ({ item, onSelect }) => {
    const { event, day, days } = item;
    return (
        <button
            type="button"
            className={eventClasses('event-chip', event)}
            onClick={(e) => onSelect(e.currentTarget, item)}
            aria-label={`${event.team} ${event.event_type}${event.title ? `, ${event.title}` : ''}`}
        >
            <span className="event-chip-top">
                <span className="event-chip-team">{event.team}</span>
                {event.venue && (
                    <span className="event-chip-venue">{event.venue === 'Home' ? 'H' : 'A'}</span>
                )}
            </span>
            <span className="event-chip-type">{event.event_type}</span>
            {event.title && <span className="event-chip-title">{event.title}</span>}
            <DayTag day={day} days={days} />
        </button>
    );
};

const MonthGrid = ({ month, byDay, todayKey, onSelect }) => (
    <Box className="calendar-grid" role="table" aria-label={`${month.name} ${month.year}`}>
        <Box className="calendar-row calendar-weekdays" role="row">
            {WEEKDAYS.map((name) => (
                <Box key={name} className="calendar-weekday" role="columnheader">
                    {name}
                </Box>
            ))}
        </Box>
        {monthWeeks(month.year, month.month).map((week, w) => (
            <Box key={w} className="calendar-row" role="row">
                {week.map((date, d) => {
                    if (!date) {
                        return <Box key={d} className="calendar-cell calendar-cell-empty" role="cell" />;
                    }
                    const key = dayKey(new Date(month.year, month.month, date));
                    const items = byDay.get(key) || [];
                    return (
                        <Box
                            key={d}
                            role="cell"
                            className={`calendar-cell${key === todayKey ? ' calendar-cell-today' : ''}`}
                        >
                            <span className="calendar-date">{date}</span>
                            {items.map((item) => (
                                <EventChip
                                    key={`${item.event.event_id}-${item.day}`}
                                    item={item}
                                    onSelect={onSelect}
                                />
                            ))}
                        </Box>
                    );
                })}
            </Box>
        ))}
    </Box>
);

/** Phones: the month as a list of days with events, everything shown inline. */
const MonthAgenda = ({ month, byDay, todayKey }) => {
    const days = monthWeeks(month.year, month.month)
        .flat()
        .filter(Boolean)
        .map((date) => new Date(month.year, month.month, date))
        .filter((date) => byDay.has(dayKey(date)));

    if (days.length === 0) {
        return (
            <Typography className="calendar-empty">
                No events scheduled for {month.name} yet.
            </Typography>
        );
    }

    return (
        <Box component="ul" className="calendar-agenda">
            {days.map((date) => {
                const key = dayKey(date);
                return (
                    <Box component="li" key={key} className="agenda-day">
                        <Typography
                            className={`agenda-date${key === todayKey ? ' agenda-date-today' : ''}`}
                        >
                            {date.toLocaleDateString('en-US', {
                                weekday: 'short',
                                month: 'short',
                                day: 'numeric',
                            })}
                        </Typography>
                        {byDay.get(key).map(({ event, day, days: length }) => (
                            <Box
                                key={`${event.event_id}-${day}`}
                                className={eventClasses('agenda-event', event)}
                            >
                                <Typography className="agenda-event-heading">
                                    <span className="agenda-event-team">{event.team}</span>{' '}
                                    {event.event_type}
                                    <DayTag day={day} days={length} />
                                </Typography>
                                {event.title && (
                                    <Typography className="agenda-event-title">{event.title}</Typography>
                                )}
                                <Typography className="agenda-event-details">
                                    {eventDetails(event)}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                );
            })}
        </Box>
    );
};

const EventDetails = ({ event }) => (
    <Box className={`event-popover ${teamClass(event.team)}`}>
        <Typography className="event-popover-team">
            {[event.team, event.venue].filter(Boolean).join(' · ')}
        </Typography>
        <Typography className="event-popover-type">{event.event_type}</Typography>
        {event.title && <Typography className="event-popover-title">{event.title}</Typography>}
        <dl className="event-popover-facts">
            <dt>Date</dt>
            <dd>{formatEventDates(event)}</dd>
            {event.start_time && (
                <>
                    <dt>Time</dt>
                    <dd>{formatTime(event.start_time)}</dd>
                </>
            )}
            {event.location && (
                <>
                    <dt>Location</dt>
                    <dd>{event.location}</dd>
                </>
            )}
        </dl>
    </Box>
);

const EventCalendar = ({ events, season, isLoading, hasError }) => {
    const months = useMemo(() => seasonMonths(season), [season]);
    const [monthIndex, setMonthIndex] = useState(() => initialMonthIndex(months));
    const [selected, setSelected] = useState(null);
    const isNarrow = useMediaQuery('(max-width: 767px)');

    const byDay = useMemo(() => eventsByDay(events), [events]);
    const todayKey = dayKey(new Date());
    const month = months[monthIndex];

    // Day keys are 'YYYY-MM-DD', so the month's own prefix is 'YYYY-MM-'.
    const monthPrefix = dayKey(new Date(month.year, month.month, 1)).slice(0, 8);
    const monthHasEvents = Array.from(byDay.keys()).some((key) => key.startsWith(monthPrefix));

    const goTo = (index) => {
        setSelected(null);
        setMonthIndex(index);
    };

    let body;
    if (isLoading) {
        body = <Skeleton variant="rectangular" className="calendar-skeleton" />;
    } else if (hasError) {
        body = (
            <Typography className="calendar-empty">
                The schedule couldn't be loaded right now. Check back soon.
            </Typography>
        );
    } else if (isNarrow) {
        body = <MonthAgenda month={month} byDay={byDay} todayKey={todayKey} />;
    } else {
        body = (
            <>
                <MonthGrid
                    month={month}
                    byDay={byDay}
                    todayKey={todayKey}
                    onSelect={(anchor, item) => setSelected({ anchor, item })}
                />
                {!monthHasEvents && (
                    <Typography className="calendar-empty calendar-empty-below">
                        No events scheduled for {month.name} yet.
                    </Typography>
                )}
            </>
        );
    }

    return (
        <Paper className="event-calendar" elevation={0} component="section" aria-labelledby="event-calendar-title">
            <Box className="calendar-header">
                <Box>
                    <Typography variant="h5" component="h2" id="event-calendar-title" className="calendar-title">
                        <EventIcon className="calendar-title-icon" />
                        Season Calendar
                    </Typography>
                    <Typography className="calendar-subtitle">
                        {season}–{String(season + 1).slice(2)} season
                    </Typography>
                </Box>
                <Box className="calendar-nav">
                    <IconButton
                        onClick={() => goTo(monthIndex - 1)}
                        disabled={monthIndex === 0}
                        aria-label="Previous month"
                        className="calendar-nav-button"
                    >
                        <ChevronLeftIcon />
                    </IconButton>
                    <Typography component="h3" className="calendar-month" aria-live="polite">
                        {month.name} {month.year}
                    </Typography>
                    <IconButton
                        onClick={() => goTo(monthIndex + 1)}
                        disabled={monthIndex === months.length - 1}
                        aria-label="Next month"
                        className="calendar-nav-button"
                    >
                        <ChevronRightIcon />
                    </IconButton>
                </Box>
            </Box>

            <Box className="calendar-toolbar">
                <Box className="calendar-months" role="group" aria-label="Choose a month">
                    {months.map((m, i) => (
                        <button
                            key={m.short}
                            type="button"
                            className={`calendar-month-pill${i === monthIndex ? ' active' : ''}`}
                            aria-pressed={i === monthIndex}
                            aria-label={`${m.name} ${m.year}`}
                            onClick={() => goTo(i)}
                        >
                            {m.short}
                        </button>
                    ))}
                </Box>
                <Box className="calendar-legend" aria-label="Legend">
                    {TEAMS.map((team) => (
                        <span key={team} className={`calendar-legend-item ${teamClass(team)}`}>
                            <span className="calendar-legend-swatch" />
                            {team}
                        </span>
                    ))}
                    <span className="calendar-legend-item">
                        <span className="calendar-legend-swatch calendar-legend-swatch-home" />
                        Home
                    </span>
                    <span className="calendar-legend-item">
                        <span className="calendar-legend-swatch calendar-legend-swatch-away" />
                        Away
                    </span>
                    <span className="calendar-legend-item">
                        <span className="calendar-legend-swatch calendar-legend-swatch-off" />
                        No practice
                    </span>
                </Box>
            </Box>

            {body}

            <Popover
                open={Boolean(selected)}
                anchorEl={selected?.anchor}
                onClose={() => setSelected(null)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                PaperProps={{ className: 'event-popover-paper' }}
            >
                {selected && <EventDetails event={selected.item.event} />}
            </Popover>
        </Paper>
    );
};

export default EventCalendar;
