import React, { useState, useMemo } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import SeasonTable from './SeasonTable';
import AdvancedStats from './AdvancedStats';
import PageHero from '../../common/Header/PageHero';
import '../styles/styles.css';
import '../../common/styles/globalStyles.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TableChartIcon from '@mui/icons-material/TableChart';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SportsKabaddiIcon from '@mui/icons-material/SportsKabaddi';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { Link } from 'react-router-dom';

const SeasonPage = (props) => {
    const { season, individualData, regularSeasonData } = props;
    const [activeTab, setActiveTab] = useState('regular');

    const individualDataFiltered = useMemo(
        () =>
            season === 'all'
                ? individualData
                : individualData.filter((match) => match.season === season),
        [season, individualData]
    );

    const regularSeasonDataFiltered = useMemo(
        () =>
            season === 'all'
                ? regularSeasonData
                : regularSeasonData.filter((match) => match.season === season),
        [season, regularSeasonData]
    );

    // Calculate summary statistics
    const summaryStats = useMemo(() => {
        const allMatches = [
            ...regularSeasonDataFiltered,
            ...individualDataFiltered,
        ];

        // Handle different possible values for match_result: 'W', 'Win', 'L', 'Loss'
        const wins = allMatches.filter((m) => {
            const result = m.match_result?.toString().toUpperCase().trim();
            return result === 'W' || result === 'WIN';
        }).length;

        const losses = allMatches.filter((m) => {
            const result = m.match_result?.toString().toUpperCase().trim();
            return result === 'L' || result === 'LOSS';
        }).length;

        const uniqueWrestlers = new Set(allMatches.map((m) => m.wrestler_id))
            .size;

        // Count pins - check both method_of_result variations
        const pins = allMatches.filter((m) => {
            const method = m.match_stats?.method_of_result?.toLowerCase() || '';
            const result = m.match_result?.toString().toUpperCase().trim();
            const isWin = result === 'W' || result === 'WIN';
            return isWin && method.includes('pin');
        }).length;

        return {
            totalMatches: allMatches.length,
            wins,
            losses,
            winRate:
                allMatches.length > 0
                    ? ((wins / allMatches.length) * 100).toFixed(1)
                    : '0.0',
            uniqueWrestlers,
            pins,
        };
    }, [regularSeasonDataFiltered, individualDataFiltered]);

    const displaySeason = season === 'all' ? 'All Time' : season;

    return (
        <Box className="season-page-wrapper">
            <PageHero
                title={displaySeason}
                subtitle={
                    season === 'all'
                        ? 'Combined statistics across all recorded seasons'
                        : `Match data and statistics for the ${season} wrestling season`
                }
            />

            <Container maxWidth="xl" className="season-page-content">
                {/* Back Link */}
                <Link to="/seasons" className="season-back-link">
                    <ArrowBackIcon sx={{ fontSize: 18 }} />
                    Back to All Seasons
                </Link>

                {/* Summary Statistics */}
                <Box className="season-summary-grid">
                    <Box className="season-stat-card">
                        <Typography className="season-stat-value">
                            {summaryStats.totalMatches}
                        </Typography>
                        <Typography className="season-stat-label">
                            Total Matches
                        </Typography>
                    </Box>
                    <Box className="season-stat-card">
                        <Typography className="season-stat-value">
                            {summaryStats.wins}
                        </Typography>
                        <Typography className="season-stat-label">
                            Wins
                        </Typography>
                    </Box>
                    <Box className="season-stat-card">
                        <Typography className="season-stat-value">
                            {summaryStats.losses}
                        </Typography>
                        <Typography className="season-stat-label">
                            Losses
                        </Typography>
                    </Box>
                    <Box className="season-stat-card">
                        <Typography className="season-stat-value">
                            {summaryStats.winRate}%
                        </Typography>
                        <Typography className="season-stat-label">
                            Win Rate
                        </Typography>
                    </Box>
                    <Box className="season-stat-card">
                        <Typography className="season-stat-value">
                            {summaryStats.pins}
                        </Typography>
                        <Typography className="season-stat-label">
                            Pins
                        </Typography>
                    </Box>
                </Box>

                {/* Navigation Tabs */}
                <Box className="season-nav-tabs">
                    <button
                        className={`season-nav-tab ${
                            activeTab === 'regular' ? 'active' : ''
                        }`}
                        onClick={() => setActiveTab('regular')}
                    >
                        <SportsKabaddiIcon
                            sx={{
                                fontSize: 16,
                                mr: 0.5,
                                verticalAlign: 'middle',
                            }}
                        />
                        Regular Season ({regularSeasonDataFiltered.length})
                    </button>
                    <button
                        className={`season-nav-tab ${
                            activeTab === 'postseason' ? 'active' : ''
                        }`}
                        onClick={() => setActiveTab('postseason')}
                    >
                        <EmojiEventsIcon
                            sx={{
                                fontSize: 16,
                                mr: 0.5,
                                verticalAlign: 'middle',
                            }}
                        />
                        Individual/Postseason ({individualDataFiltered.length})
                    </button>
                    <button
                        className={`season-nav-tab ${
                            activeTab === 'advanced' ? 'active' : ''
                        }`}
                        onClick={() => setActiveTab('advanced')}
                    >
                        <TrendingUpIcon
                            sx={{
                                fontSize: 16,
                                mr: 0.5,
                                verticalAlign: 'middle',
                            }}
                        />
                        Advanced Stats
                    </button>
                </Box>

                {/* Regular Season Section */}
                {activeTab === 'regular' && (
                    <Box className="season-section">
                        <Box className="season-section-header">
                            <Box className="season-section-icon">
                                <TableChartIcon sx={{ fontSize: 20 }} />
                            </Box>
                            <Box>
                                <Typography className="season-section-title">
                                    Regular Season Matches
                                </Typography>
                                <Typography className="season-section-subtitle">
                                    Dual meet matches with full scoring
                                    breakdown
                                </Typography>
                            </Box>
                        </Box>
                        <Box className="season-table-container">
                            <SeasonTable
                                data={regularSeasonDataFiltered}
                                type="regularSeason"
                            />
                        </Box>
                    </Box>
                )}

                {/* Individual/Postseason Section */}
                {activeTab === 'postseason' && (
                    <Box className="season-section">
                        <Box className="season-section-header">
                            <Box className="season-section-icon">
                                <EmojiEventsIcon sx={{ fontSize: 20 }} />
                            </Box>
                            <Box>
                                <Typography className="season-section-title">
                                    Individual & Postseason Matches
                                </Typography>
                                <Typography className="season-section-subtitle">
                                    Tournament and individual competition
                                    results
                                </Typography>
                            </Box>
                        </Box>
                        <Box className="season-table-container">
                            <SeasonTable
                                data={individualDataFiltered}
                                type="individual"
                            />
                        </Box>
                    </Box>
                )}

                {/* Advanced Stats Section */}
                {activeTab === 'advanced' && (
                    <AdvancedStats
                        regularSeasonDataFiltered={regularSeasonDataFiltered}
                        individualDataFiltered={individualDataFiltered}
                        season={season}
                        regularSeasonData={regularSeasonData}
                    />
                )}
            </Container>
        </Box>
    );
};

export default SeasonPage;
