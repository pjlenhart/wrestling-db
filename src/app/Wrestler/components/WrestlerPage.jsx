import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import WrestlerPageTable from './WrestlerPageTable';
import WrestlerStatBox from './WrestlerStatBox';
import RadarChart from './RadarCharts';
import PageHero from '../../common/Header/PageHero';
import '../styles/wrestlerStyles.css';
import '../../common/styles/globalStyles.css';
import TableChartIcon from '@mui/icons-material/TableChart';
import BarChartIcon from '@mui/icons-material/BarChart';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import TimelineIcon from '@mui/icons-material/Timeline';

const WrestlerPage = (props) => {
    const {
        regularSeasonData,
        individualData,
        wrestlerData,
        careerStats,
        accolades,
    } = props;
    
    const wrestlerName = wrestlerData ? wrestlerData.wrestler_name : null;
    const careerArr = careerStats.filter((stats) => stats.season === 'Career');
    const seasons = [...new Set(careerStats.map((stat) => stat.season))];
    const seasonList = seasons.filter((season) => season !== 'Career').reverse();
    const career = careerArr[0] ? careerArr[0] : null;

    if (!regularSeasonData) return null;

    return (
        <Box className="modern-page">
            <PageHero 
                title={wrestlerName} 
                subtitle={wrestlerData?.classOf ? `Class of ${wrestlerData.classOf}` : 'Towson Wrestler'}
            />
            
            <Container maxWidth="lg" className="page-content">
                {/* 1. Career Accolades */}
                {accolades && accolades.length > 0 && (
                    <Paper className="content-card" elevation={0}>
                        <Box className="section-header">
                            <EmojiEventsIcon className="section-title-icon" style={{ color: '#FFD700' }} />
                            <Typography className="section-title">
                                Career Accolades
                            </Typography>
                        </Box>
                        <Box className="wrestler-accolades-list">
                            {accolades.map((acc, index) => (
                                <Chip
                                    key={index}
                                    icon={<EmojiEventsIcon style={{ color: '#FFD700' }} />}
                                    label={`${acc.place} place - ${acc.season} ${acc.tournament}`}
                                    className="wrestler-accolade-chip"
                                />
                            ))}
                        </Box>
                    </Paper>
                )}

                {/* 2. Career Statistics - Full Width */}
                <Paper className="content-card" elevation={0}>
                    <Box className="section-header">
                        <BarChartIcon className="section-title-icon" />
                        <Typography className="section-title">
                            Career Statistics
                        </Typography>
                    </Box>
                    <Typography className="section-subtitle">
                        *Note: Some statistics are only counted in regular season. Wins/losses, match times, and periods are counted in both regular and post season.
                    </Typography>
                    <WrestlerStatBox data={career} />
                </Paper>

                {/* 3. Regular Season - Full Width */}
                <Paper className="content-card" elevation={0}>
                    <Box className="section-header">
                        <TableChartIcon className="section-title-icon" />
                        <Typography className="section-title">
                            Regular Season - Career
                        </Typography>
                    </Box>
                    <WrestlerPageTable
                        data={regularSeasonData}
                        type="regularSeason"
                    />
                </Paper>

                {/* 4. Individual/Post Season - Full Width */}
                <Paper className="content-card" elevation={0}>
                    <Box className="section-header">
                        <TableChartIcon className="section-title-icon" />
                        <Typography className="section-title">
                            Individual/Postseason - Career
                        </Typography>
                    </Box>
                    <WrestlerPageTable
                        data={individualData}
                        type="individual"
                    />
                </Paper>

                {/* 5. Scoring Actions Breakdown - Full Width with Larger Charts */}
                {seasonList.length > 0 && (
                    <Paper className="content-card" elevation={0}>
                        <Box className="section-header">
                            <TimelineIcon className="section-title-icon" />
                            <Typography className="section-title">
                                Scoring Actions Breakdown by Season
                            </Typography>
                        </Box>
                        <Typography className="section-subtitle">
                            Compare scoring actions against opponents across different seasons
                        </Typography>
                        <Grid container spacing={4}>
                            {seasonList.map((season, index) => (
                                <Grid item xs={12} md={6} key={index}>
                                    <Box className="wrestler-radar-section">
                                        <Typography className="wrestler-season-label">
                                            Season {season}
                                        </Typography>
                                        <Box className="wrestler-radar-container-large">
                                            <RadarChart
                                                chartData={careerStats.filter(
                                                    (sea) => sea.season === season
                                                )}
                                            />
                                        </Box>
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>
                    </Paper>
                )}
            </Container>
        </Box>
    );
};

export default WrestlerPage;
