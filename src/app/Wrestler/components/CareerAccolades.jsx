import React, { useMemo } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

// In wrestling the top six place, so all six count as the podium. Only
// podium finishes are ever recorded as accolades.
const PODIUM_PLACES = 6;

// The number a place starts with ("1st" -> 1), or null for anything that
// isn't a numbered finish.
const placeNumber = (place) => {
    const n = parseInt(place, 10);
    return Number.isNaN(n) ? null : n;
};

// Best seasons first, and within a season the best finishes first.
const byRecencyThenFinish = (a, b) => {
    if (a.season !== b.season) return String(b.season).localeCompare(String(a.season));
    return (placeNumber(a.place) ?? Infinity) - (placeNumber(b.place) ?? Infinity);
};

const CareerAccolades = ({ accolades }) => {
    const sorted = useMemo(() => [...accolades].sort(byRecencyThenFinish), [accolades]);

    const titles = accolades.filter((a) => placeNumber(a.place) === 1).length;
    const topThree = accolades.filter((a) => {
        const n = placeNumber(a.place);
        return n !== null && n <= 3;
    }).length;

    return (
        <Paper className="content-card" elevation={0}>
            <Box className="accolades-header">
                <Box className="section-header accolades-header-title">
                    <EmojiEventsIcon className="section-title-icon" />
                    <Typography className="section-title">Career Accolades</Typography>
                </Box>
                <Box className="accolades-tally">
                    <Box className="accolades-tally-item">
                        <Typography className="accolades-tally-value">{titles}</Typography>
                        <Typography className="accolades-tally-label">
                            {titles === 1 ? 'Title' : 'Titles'}
                        </Typography>
                    </Box>
                    <Box className="accolades-tally-item">
                        <Typography className="accolades-tally-value">{topThree}</Typography>
                        <Typography className="accolades-tally-label">Top 3</Typography>
                    </Box>
                    <Box className="accolades-tally-item">
                        <Typography className="accolades-tally-value">{accolades.length}</Typography>
                        <Typography className="accolades-tally-label">
                            {accolades.length === 1 ? 'Podium' : 'Podiums'}
                        </Typography>
                    </Box>
                </Box>
            </Box>

            <Box className="accolades-grid">
                {sorted.map((acc, index) => {
                    const n = placeNumber(acc.place);
                    // Medal tiers drive the look in CSS: gold, silver and bronze
                    // for the top three and a team-colour medal for 4th-6th. A
                    // place that isn't a numbered finish falls back to neutral.
                    let tier = 'place-other';
                    if (n !== null && n <= 3) tier = `place-${n}`;
                    else if (n !== null && n <= PODIUM_PLACES) tier = 'place-podium';

                    return (
                        <Box key={index} className={`accolade-card ${tier}`}>
                            <Box className="accolade-medal" aria-hidden="true">
                                {n !== null ? (
                                    <Typography className="accolade-medal-text">
                                        {acc.place}
                                    </Typography>
                                ) : (
                                    <EmojiEventsIcon className="accolade-medal-icon" />
                                )}
                            </Box>
                            <Box className="accolade-info">
                                <Typography className="accolade-tournament">
                                    {acc.tournament}
                                </Typography>
                                <Typography className="accolade-meta">
                                    {n !== null ? `${acc.place} place` : acc.place}
                                    <span className="accolade-meta-dot">·</span>
                                    {acc.season}
                                </Typography>
                            </Box>
                        </Box>
                    );
                })}
            </Box>
        </Paper>
    );
};

export default CareerAccolades;
