import React, { useMemo } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TeamRadarChart from './TeamRadarChart';
import { hasBreakdown, sumBreakdowns } from '../../common/scoringBreakdown';

const AdvancedStats = ({
    regularSeasonDataFiltered,
    individualDataFiltered,
    season,
}) => {
    // Every dual meet match, plus the postseason matches that were entered with
    // a full breakdown. Postseason matches without one are left out entirely,
    // rather than counted as matches where nothing happened.
    const breakdownMatches = useMemo(
        () =>
            [...regularSeasonDataFiltered, ...individualDataFiltered].filter(
                hasBreakdown
            ),
        [regularSeasonDataFiltered, individualDataFiltered]
    );

    const advancedStats = useMemo(
        () => sumBreakdowns(breakdownMatches),
        [breakdownMatches]
    );

    // Aggregate win/loss methods and periods (includes both dual meet and individual/postseason)
    const methodsAndPeriods = useMemo(() => {
        const methods = {
            wins: {
                pin: 0,
                tech: 0,
                major: 0,
                decision: 0,
                forfeit: 0,
                other: 0,
            },
            losses: {
                pin: 0,
                tech: 0,
                major: 0,
                decision: 0,
                forfeit: 0,
                other: 0,
            },
        };
        const periods = {
            wins: { first: 0, second: 0, third: 0, ot: 0, na: 0 },
            losses: { first: 0, second: 0, third: 0, ot: 0, na: 0 },
        };

        // Combine both dual meet and individual/postseason data
        const allMatches = [
            ...regularSeasonDataFiltered,
            ...individualDataFiltered,
        ];

        allMatches.forEach((match) => {
            const ms = match.match_stats || {};
            const result = match.match_result?.toString().toUpperCase().trim();
            const isWin = result === 'W' || result === 'WIN';
            const isLoss = result === 'L' || result === 'LOSS';
            const method = (ms.method_of_result || '').toLowerCase();
            const period = (ms.period || '').toString().toLowerCase();

            if (!isWin && !isLoss) return;

            const target = isWin ? 'wins' : 'losses';

            // Categorize method
            if (method.includes('pin')) {
                methods[target].pin++;
            } else if (method.includes('tech') || method.includes('tf')) {
                methods[target].tech++;
            } else if (method.includes('major') || method.includes('md')) {
                methods[target].major++;
            } else if (method.includes('decision') || method.includes('dec')) {
                methods[target].decision++;
            } else if (
                method.includes('forfeit') ||
                method.includes('ff') ||
                method.includes('dq') ||
                method.includes('default')
            ) {
                methods[target].forfeit++;
            } else {
                methods[target].other++;
            }

            // Categorize period
            if (period.includes('1st') || period === 'first') {
                periods[target].first++;
            } else if (period.includes('2nd') || period === 'second') {
                periods[target].second++;
            } else if (period.includes('3rd') || period === 'third') {
                periods[target].third++;
            } else if (
                period.includes('ot') ||
                period.includes('overtime') ||
                period.includes('sb') ||
                period.includes('sudden')
            ) {
                periods[target].ot++;
            } else {
                periods[target].na++;
            }
        });

        return { methods, periods };
    }, [regularSeasonDataFiltered, individualDataFiltered]);

    // Extract unique seasons for "All Seasons" radar charts. On that view the
    // filtered data is all of it.
    const uniqueSeasons = useMemo(() => {
        if (season !== 'all') return [];
        const seasonsSet = new Set(
            breakdownMatches.map((m) => m.season).filter(Boolean)
        );
        return Array.from(seasonsSet).sort().reverse();
    }, [season, breakdownMatches]);

    // Calculate stats per season for "All Seasons" view
    const statsBySeason = useMemo(() => {
        if (season !== 'all') return {};

        const result = {};
        uniqueSeasons.forEach((s) => {
            result[s] = sumBreakdowns(
                breakdownMatches.filter((m) => m.season === s)
            );
        });

        return result;
    }, [season, breakdownMatches, uniqueSeasons]);

    return (
        <Box className="season-section">
            <Box className="season-section-header">
                <Box className="season-section-icon">
                    <TrendingUpIcon sx={{ fontSize: 20 }} />
                </Box>
                <Box>
                    <Typography className="season-section-title">
                        Advanced Statistics
                    </Typography>
                    <Typography className="season-section-subtitle">
                        Aggregated scoring actions from dual meets and from
                        postseason matches with a full scoring breakdown
                    </Typography>
                </Box>
            </Box>

            {/* Stats Grid - Scoring Actions */}
            <Box className="advanced-stats-section">
                <Typography className="advanced-stats-category-title">
                    Scoring Actions
                </Typography>
                <Box className="advanced-stats-grid">
                    <Paper className="advanced-stat-card" elevation={0}>
                        <Box className="advanced-stat-row">
                            <Box className="advanced-stat-item for">
                                <Typography className="advanced-stat-value">
                                    {advancedStats.takedowns_for}
                                </Typography>
                                <Typography className="advanced-stat-label">
                                    For
                                </Typography>
                            </Box>
                            <Box className="advanced-stat-title-box">
                                <Typography className="advanced-stat-title">
                                    Takedowns
                                </Typography>
                            </Box>
                            <Box className="advanced-stat-item against">
                                <Typography className="advanced-stat-value">
                                    {advancedStats.takedowns_against}
                                </Typography>
                                <Typography className="advanced-stat-label">
                                    Against
                                </Typography>
                            </Box>
                        </Box>
                    </Paper>

                    <Paper className="advanced-stat-card" elevation={0}>
                        <Box className="advanced-stat-row">
                            <Box className="advanced-stat-item for">
                                <Typography className="advanced-stat-value">
                                    {advancedStats.reversals_for}
                                </Typography>
                                <Typography className="advanced-stat-label">
                                    For
                                </Typography>
                            </Box>
                            <Box className="advanced-stat-title-box">
                                <Typography className="advanced-stat-title">
                                    Reversals
                                </Typography>
                            </Box>
                            <Box className="advanced-stat-item against">
                                <Typography className="advanced-stat-value">
                                    {advancedStats.reversals_against}
                                </Typography>
                                <Typography className="advanced-stat-label">
                                    Against
                                </Typography>
                            </Box>
                        </Box>
                    </Paper>

                    <Paper className="advanced-stat-card" elevation={0}>
                        <Box className="advanced-stat-row">
                            <Box className="advanced-stat-item for">
                                <Typography className="advanced-stat-value">
                                    {advancedStats.escapes_for}
                                </Typography>
                                <Typography className="advanced-stat-label">
                                    For
                                </Typography>
                            </Box>
                            <Box className="advanced-stat-title-box">
                                <Typography className="advanced-stat-title">
                                    Escapes
                                </Typography>
                            </Box>
                            <Box className="advanced-stat-item against">
                                <Typography className="advanced-stat-value">
                                    {advancedStats.escapes_against}
                                </Typography>
                                <Typography className="advanced-stat-label">
                                    Against
                                </Typography>
                            </Box>
                        </Box>
                    </Paper>

                    <Paper className="advanced-stat-card" elevation={0}>
                        <Box className="advanced-stat-row">
                            <Box className="advanced-stat-item for">
                                <Typography className="advanced-stat-value">
                                    {advancedStats.nearfall_for}
                                </Typography>
                                <Typography className="advanced-stat-label">
                                    For
                                </Typography>
                            </Box>
                            <Box className="advanced-stat-title-box">
                                <Typography className="advanced-stat-title">
                                    Near Falls
                                </Typography>
                            </Box>
                            <Box className="advanced-stat-item against">
                                <Typography className="advanced-stat-value">
                                    {advancedStats.nearfall_against}
                                </Typography>
                                <Typography className="advanced-stat-label">
                                    Against
                                </Typography>
                            </Box>
                        </Box>
                    </Paper>

                    <Paper className="advanced-stat-card" elevation={0}>
                        <Box className="advanced-stat-row">
                            <Box className="advanced-stat-item for">
                                <Typography className="advanced-stat-value">
                                    {advancedStats.penalties_for}
                                </Typography>
                                <Typography className="advanced-stat-label">
                                    For
                                </Typography>
                            </Box>
                            <Box className="advanced-stat-title-box">
                                <Typography className="advanced-stat-title">
                                    Penalties
                                </Typography>
                            </Box>
                            <Box className="advanced-stat-item against">
                                <Typography className="advanced-stat-value">
                                    {advancedStats.penalties_against}
                                </Typography>
                                <Typography className="advanced-stat-label">
                                    Against
                                </Typography>
                            </Box>
                        </Box>
                    </Paper>
                </Box>

                {/* Points Grid */}
                <Typography
                    className="advanced-stats-category-title"
                    style={{ marginTop: '2rem' }}
                >
                    Points Breakdown
                </Typography>
                <Box className="advanced-stats-grid">
                    <Paper className="advanced-stat-card" elevation={0}>
                        <Box className="advanced-stat-row">
                            <Box className="advanced-stat-item for">
                                <Typography className="advanced-stat-value">
                                    {advancedStats.takedown_points_for}
                                </Typography>
                                <Typography className="advanced-stat-label">
                                    For
                                </Typography>
                            </Box>
                            <Box className="advanced-stat-title-box">
                                <Typography className="advanced-stat-title">
                                    TD Points
                                </Typography>
                            </Box>
                            <Box className="advanced-stat-item against">
                                <Typography className="advanced-stat-value">
                                    {advancedStats.takedown_points_against}
                                </Typography>
                                <Typography className="advanced-stat-label">
                                    Against
                                </Typography>
                            </Box>
                        </Box>
                    </Paper>

                    <Paper className="advanced-stat-card" elevation={0}>
                        <Box className="advanced-stat-row">
                            <Box className="advanced-stat-item for">
                                <Typography className="advanced-stat-value">
                                    {advancedStats.reversal_points_for}
                                </Typography>
                                <Typography className="advanced-stat-label">
                                    For
                                </Typography>
                            </Box>
                            <Box className="advanced-stat-title-box">
                                <Typography className="advanced-stat-title">
                                    Rev Points
                                </Typography>
                            </Box>
                            <Box className="advanced-stat-item against">
                                <Typography className="advanced-stat-value">
                                    {advancedStats.reversal_points_against}
                                </Typography>
                                <Typography className="advanced-stat-label">
                                    Against
                                </Typography>
                            </Box>
                        </Box>
                    </Paper>

                    <Paper className="advanced-stat-card" elevation={0}>
                        <Box className="advanced-stat-row">
                            <Box className="advanced-stat-item for">
                                <Typography className="advanced-stat-value">
                                    {advancedStats.escape_points_for}
                                </Typography>
                                <Typography className="advanced-stat-label">
                                    For
                                </Typography>
                            </Box>
                            <Box className="advanced-stat-title-box">
                                <Typography className="advanced-stat-title">
                                    Esc Points
                                </Typography>
                            </Box>
                            <Box className="advanced-stat-item against">
                                <Typography className="advanced-stat-value">
                                    {advancedStats.escape_points_against}
                                </Typography>
                                <Typography className="advanced-stat-label">
                                    Against
                                </Typography>
                            </Box>
                        </Box>
                    </Paper>

                    <Paper className="advanced-stat-card" elevation={0}>
                        <Box className="advanced-stat-row">
                            <Box className="advanced-stat-item for">
                                <Typography className="advanced-stat-value">
                                    {advancedStats.nearfall_points_for}
                                </Typography>
                                <Typography className="advanced-stat-label">
                                    For
                                </Typography>
                            </Box>
                            <Box className="advanced-stat-title-box">
                                <Typography className="advanced-stat-title">
                                    NF Points
                                </Typography>
                            </Box>
                            <Box className="advanced-stat-item against">
                                <Typography className="advanced-stat-value">
                                    {advancedStats.nearfall_points_against}
                                </Typography>
                                <Typography className="advanced-stat-label">
                                    Against
                                </Typography>
                            </Box>
                        </Box>
                    </Paper>

                    <Paper className="advanced-stat-card" elevation={0}>
                        <Box className="advanced-stat-row">
                            <Box className="advanced-stat-item for">
                                <Typography className="advanced-stat-value">
                                    {advancedStats.penalty_points_for}
                                </Typography>
                                <Typography className="advanced-stat-label">
                                    For
                                </Typography>
                            </Box>
                            <Box className="advanced-stat-title-box">
                                <Typography className="advanced-stat-title">
                                    Pen Points
                                </Typography>
                            </Box>
                            <Box className="advanced-stat-item against">
                                <Typography className="advanced-stat-value">
                                    {advancedStats.penalty_points_against}
                                </Typography>
                                <Typography className="advanced-stat-label">
                                    Against
                                </Typography>
                            </Box>
                        </Box>
                    </Paper>
                </Box>

                {/* Total Points */}
                <Box className="advanced-stats-total-row">
                    <Paper className="advanced-stat-card total" elevation={0}>
                        <Box className="advanced-stat-row">
                            <Box className="advanced-stat-item for">
                                <Typography className="advanced-stat-value large">
                                    {advancedStats.total_points_for}
                                </Typography>
                                <Typography className="advanced-stat-label">
                                    Total For
                                </Typography>
                            </Box>
                            <Box className="advanced-stat-title-box">
                                <Typography className="advanced-stat-title">
                                    Total Points
                                </Typography>
                            </Box>
                            <Box className="advanced-stat-item against">
                                <Typography className="advanced-stat-value large">
                                    {advancedStats.total_points_against}
                                </Typography>
                                <Typography className="advanced-stat-label">
                                    Total Against
                                </Typography>
                            </Box>
                        </Box>
                    </Paper>
                </Box>

                {/* Win/Loss Methods */}
                <Typography
                    className="advanced-stats-category-title"
                    style={{ marginTop: '2rem' }}
                >
                    Match Results by Method
                </Typography>
                <Box className="advanced-stats-methods-grid">
                    <Paper
                        className="advanced-stat-card method-card"
                        elevation={0}
                    >
                        <Box className="method-stat-row">
                            <Box className="method-stat-item win">
                                <Typography className="method-stat-value">
                                    {methodsAndPeriods.methods.wins.pin}
                                </Typography>
                            </Box>
                            <Box className="method-stat-title-box">
                                <Typography className="method-stat-title">
                                    Pin
                                </Typography>
                            </Box>
                            <Box className="method-stat-item loss">
                                <Typography className="method-stat-value">
                                    {methodsAndPeriods.methods.losses.pin}
                                </Typography>
                            </Box>
                        </Box>
                    </Paper>

                    <Paper
                        className="advanced-stat-card method-card"
                        elevation={0}
                    >
                        <Box className="method-stat-row">
                            <Box className="method-stat-item win">
                                <Typography className="method-stat-value">
                                    {methodsAndPeriods.methods.wins.tech}
                                </Typography>
                            </Box>
                            <Box className="method-stat-title-box">
                                <Typography className="method-stat-title">
                                    Tech Fall
                                </Typography>
                            </Box>
                            <Box className="method-stat-item loss">
                                <Typography className="method-stat-value">
                                    {methodsAndPeriods.methods.losses.tech}
                                </Typography>
                            </Box>
                        </Box>
                    </Paper>

                    <Paper
                        className="advanced-stat-card method-card"
                        elevation={0}
                    >
                        <Box className="method-stat-row">
                            <Box className="method-stat-item win">
                                <Typography className="method-stat-value">
                                    {methodsAndPeriods.methods.wins.major}
                                </Typography>
                            </Box>
                            <Box className="method-stat-title-box">
                                <Typography className="method-stat-title">
                                    Major Dec
                                </Typography>
                            </Box>
                            <Box className="method-stat-item loss">
                                <Typography className="method-stat-value">
                                    {methodsAndPeriods.methods.losses.major}
                                </Typography>
                            </Box>
                        </Box>
                    </Paper>

                    <Paper
                        className="advanced-stat-card method-card"
                        elevation={0}
                    >
                        <Box className="method-stat-row">
                            <Box className="method-stat-item win">
                                <Typography className="method-stat-value">
                                    {methodsAndPeriods.methods.wins.decision}
                                </Typography>
                            </Box>
                            <Box className="method-stat-title-box">
                                <Typography className="method-stat-title">
                                    Decision
                                </Typography>
                            </Box>
                            <Box className="method-stat-item loss">
                                <Typography className="method-stat-value">
                                    {methodsAndPeriods.methods.losses.decision}
                                </Typography>
                            </Box>
                        </Box>
                    </Paper>

                    <Paper
                        className="advanced-stat-card method-card"
                        elevation={0}
                    >
                        <Box className="method-stat-row">
                            <Box className="method-stat-item win">
                                <Typography className="method-stat-value">
                                    {methodsAndPeriods.methods.wins.forfeit}
                                </Typography>
                            </Box>
                            <Box className="method-stat-title-box">
                                <Typography className="method-stat-title">
                                    FF/DQ/Def
                                </Typography>
                            </Box>
                            <Box className="method-stat-item loss">
                                <Typography className="method-stat-value">
                                    {methodsAndPeriods.methods.losses.forfeit}
                                </Typography>
                            </Box>
                        </Box>
                    </Paper>
                </Box>

                {/* Methods Legend */}
                <Box className="methods-legend">
                    <Box className="legend-item">
                        <Box className="legend-color win"></Box>
                        <Typography className="legend-text">Wins</Typography>
                    </Box>
                    <Box className="legend-item">
                        <Box className="legend-color loss"></Box>
                        <Typography className="legend-text">Losses</Typography>
                    </Box>
                </Box>

                {/* Period Match Ended */}
                <Typography
                    className="advanced-stats-category-title"
                    style={{ marginTop: '2rem' }}
                >
                    Match Results by Period
                </Typography>
                <Box className="advanced-stats-periods-grid">
                    <Paper
                        className="advanced-stat-card method-card"
                        elevation={0}
                    >
                        <Box className="method-stat-row">
                            <Box className="method-stat-item win">
                                <Typography className="method-stat-value">
                                    {methodsAndPeriods.periods.wins.first}
                                </Typography>
                            </Box>
                            <Box className="method-stat-title-box">
                                <Typography className="method-stat-title">
                                    1st Period
                                </Typography>
                            </Box>
                            <Box className="method-stat-item loss">
                                <Typography className="method-stat-value">
                                    {methodsAndPeriods.periods.losses.first}
                                </Typography>
                            </Box>
                        </Box>
                    </Paper>

                    <Paper
                        className="advanced-stat-card method-card"
                        elevation={0}
                    >
                        <Box className="method-stat-row">
                            <Box className="method-stat-item win">
                                <Typography className="method-stat-value">
                                    {methodsAndPeriods.periods.wins.second}
                                </Typography>
                            </Box>
                            <Box className="method-stat-title-box">
                                <Typography className="method-stat-title">
                                    2nd Period
                                </Typography>
                            </Box>
                            <Box className="method-stat-item loss">
                                <Typography className="method-stat-value">
                                    {methodsAndPeriods.periods.losses.second}
                                </Typography>
                            </Box>
                        </Box>
                    </Paper>

                    <Paper
                        className="advanced-stat-card method-card"
                        elevation={0}
                    >
                        <Box className="method-stat-row">
                            <Box className="method-stat-item win">
                                <Typography className="method-stat-value">
                                    {methodsAndPeriods.periods.wins.third}
                                </Typography>
                            </Box>
                            <Box className="method-stat-title-box">
                                <Typography className="method-stat-title">
                                    3rd Period
                                </Typography>
                            </Box>
                            <Box className="method-stat-item loss">
                                <Typography className="method-stat-value">
                                    {methodsAndPeriods.periods.losses.third}
                                </Typography>
                            </Box>
                        </Box>
                    </Paper>

                    <Paper
                        className="advanced-stat-card method-card"
                        elevation={0}
                    >
                        <Box className="method-stat-row">
                            <Box className="method-stat-item win">
                                <Typography className="method-stat-value">
                                    {methodsAndPeriods.periods.wins.ot}
                                </Typography>
                            </Box>
                            <Box className="method-stat-title-box">
                                <Typography className="method-stat-title">
                                    Overtime
                                </Typography>
                            </Box>
                            <Box className="method-stat-item loss">
                                <Typography className="method-stat-value">
                                    {methodsAndPeriods.periods.losses.ot}
                                </Typography>
                            </Box>
                        </Box>
                    </Paper>
                </Box>
            </Box>

            {/* Radar Charts Section */}
            <Box className="advanced-stats-radar-section">
                <Typography className="advanced-stats-category-title">
                    Scoring Actions Visualization
                </Typography>
                <Typography className="advanced-stats-subtitle">
                    Compare team scoring actions against opponents
                </Typography>

                {season === 'all' ? (
                    /* All Seasons View - Multiple Radar Charts */
                    <Grid container spacing={4}>
                        {/* Combined All Seasons Chart */}
                        <Grid item xs={12} md={6}>
                            <Box className="radar-chart-section">
                                <Typography className="radar-chart-label">
                                    All Seasons Combined
                                </Typography>
                                <Box className="radar-chart-container">
                                    <TeamRadarChart
                                        stats={advancedStats}
                                        label="All Seasons"
                                    />
                                </Box>
                            </Box>
                        </Grid>

                        {/* Individual Season Charts */}
                        {uniqueSeasons.map((s) => (
                            <Grid item xs={12} md={6} key={s}>
                                <Box className="radar-chart-section">
                                    <Typography className="radar-chart-label">
                                        Season {s}
                                    </Typography>
                                    <Box className="radar-chart-container">
                                        <TeamRadarChart
                                            stats={statsBySeason[s]}
                                            label={s}
                                        />
                                    </Box>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    /* Single Season View - One Radar Chart */
                    <Box className="radar-chart-single">
                        <Box className="radar-chart-section">
                            <Typography className="radar-chart-label">
                                Season {season}
                            </Typography>
                            <Box className="radar-chart-container">
                                <TeamRadarChart
                                    stats={advancedStats}
                                    label={`${season} Team`}
                                />
                            </Box>
                        </Box>
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default AdvancedStats;

