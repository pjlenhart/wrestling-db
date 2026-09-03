import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import PageHero from '../../common/Header/PageHero';
import '../styles/styles.css';
import '../../common/styles/globalStyles.css';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import HistoryIcon from '@mui/icons-material/History';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

// Trophy SVG icon component
const TrophyIcon = () => (
    <svg viewBox="0 0 100 100" className="season-card-svg-icon">
        <path d="M30 20 L30 50 Q30 70 50 75 Q70 70 70 50 L70 20 Z" 
              fill="none" stroke="currentColor" strokeWidth="3"/>
        <path d="M30 30 Q15 30 15 45 Q15 55 30 55" fill="none" stroke="currentColor" strokeWidth="2.5"/>
        <path d="M70 30 Q85 30 85 45 Q85 55 70 55" fill="none" stroke="currentColor" strokeWidth="2.5"/>
        <line x1="50" y1="75" x2="50" y2="85" stroke="currentColor" strokeWidth="3"/>
        <rect x="35" y="85" width="30" height="8" rx="2" fill="none" stroke="currentColor" strokeWidth="2.5"/>
    </svg>
);

const Seasons = (props) => {
    // One branded treatment instead of six unrelated neon accents: maroon for
    // the seasons we want people in (all-time and current), graphite for the
    // archive, so the header art reinforces hierarchy rather than randomising it.
    const seasonColors = {
        featured: {
            bg: 'linear-gradient(135deg, #800000 0%, #4a0000 100%)',
            accent: 'rgba(255, 255, 255, 0.92)',
        },
        archive: {
            bg: 'linear-gradient(135deg, #3a3a3f 0%, #232327 100%)',
            accent: 'rgba(255, 255, 255, 0.72)',
        },
    };

    const seasons = [
        {
            id: 'all',
            title: 'All Seasons',
            subtitle: 'Combined statistics from all seasons on record',
            link: '/seasons/all',
            featured: true,
            colors: seasonColors.featured,
        },
        {
            id: '2025-2026',
            title: '2025-2026',
            subtitle: 'Current season data and statistics',
            link: '/seasons/2025-2026',
            featured: true,
            colors: seasonColors.featured,
        },
        {
            id: '2024-2025',
            title: '2024-2025',
            subtitle: 'Data and statistics from the 2024-2025 season',
            link: '/seasons/2024-2025',
            colors: seasonColors.archive,
        },
        {
            id: '2023-2024',
            title: '2023-2024',
            subtitle: 'Data and statistics from the 2023-2024 season',
            link: '/seasons/2023-2024',
            colors: seasonColors.archive,
        },
        {
            id: '2022-2023',
            title: '2022-2023',
            subtitle: 'Data and statistics from the 2022-2023 season',
            link: '/seasons/2022-2023',
            colors: seasonColors.archive,
        },
        {
            id: '2021-2022',
            title: '2021-2022',
            subtitle: 'Data and statistics from the 2021-2022 season',
            link: '/seasons/2021-2022',
            colors: seasonColors.archive,
        },
    ];

    return (
        <Box className="modern-page">
            <PageHero 
                title="Season Stats" 
                subtitle="One stop shop for individual statistics by match"
            />
            
            <Container maxWidth="lg" className="page-content">
                <Grid container spacing={3}>
                    {seasons.map((season, index) => (
                        <Grid item xs={12} sm={6} md={4} key={season.id}>
                            <Link href={season.link} className="season-card-link">
                                <Paper 
                                    className={`season-card-modern ${season.featured ? 'featured' : ''}`} 
                                    elevation={0}
                                >
                                    <Box 
                                        className="season-card-icon-container"
                                        sx={{ 
                                            background: season.colors.bg,
                                            '--icon-accent': season.colors.accent,
                                        }}
                                    >
                                        <Box className="season-card-icon-wrapper">
                                            <TrophyIcon />
                                        </Box>
                                        {season.featured && (
                                            <Box className="season-card-badge">
                                                {season.id === 'all' ? (
                                                    <HistoryIcon sx={{ fontSize: 16 }} />
                                                ) : (
                                                    <CalendarMonthIcon sx={{ fontSize: 16 }} />
                                                )}
                                            </Box>
                                        )}
                                        <Box className="season-card-pattern" />
                                    </Box>
                                    <Box className="season-card-content">
                                        <Typography className="season-card-title">
                                            {season.title}
                                        </Typography>
                                        <Typography className="season-card-subtitle">
                                            {season.subtitle}
                                        </Typography>
                                        <Box className="season-card-action">
                                            <Typography className="season-card-explore">
                                                Explore
                                            </Typography>
                                            <ChevronRightIcon className="season-card-arrow" />
                                        </Box>
                                    </Box>
                                </Paper>
                            </Link>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default Seasons;
