import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import MatchTable from './MatchTable';
import '../styles/matchStyles.css';
import '../../common/styles/globalStyles.css';
import PageHero from '../../common/Header/PageHero';
import SportsKabaddiIcon from '@mui/icons-material/SportsKabaddi';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const Matches = (props) => {
    const { seasons, teamMatchData } = props;
    const orderSeasons = [...seasons].reverse();

    const getSeasonRecord = (seasonMatches) => {
        const wins = seasonMatches.filter(m => {
            const result = m.team_result?.toString().toUpperCase().trim();
            return result === 'W' || result === 'WIN';
        }).length;
        const losses = seasonMatches.filter(m => {
            const result = m.team_result?.toString().toUpperCase().trim();
            return result === 'L' || result === 'LOSS';
        }).length;
        return { wins, losses };
    };

    return (
        <Box className="modern-page">
            <PageHero 
                title="Dual Meet Results" 
                subtitle="Team match results and scores from all seasons"
            />
            
            <Container maxWidth="lg" className="page-content">
                {orderSeasons.map((season, index) => {
                    const seasonMatches = teamMatchData.filter(
                        (match) => match.season === season
                    );
                    const record = getSeasonRecord(seasonMatches);
                    
                    return (
                        <Paper key={index} className="content-card matches-season-card" elevation={0}>
                            <Box className="matches-season-header">
                                <Box className="section-header">
                                    <CalendarMonthIcon className="section-title-icon" />
                                    <Typography className="section-title">
                                        Season {season}
                                    </Typography>
                                </Box>
                                <Box className="matches-record-chips">
                                    <Chip 
                                        label={`${record.wins}W`} 
                                        size="small"
                                        className="matches-chip-win"
                                    />
                                    <Chip 
                                        label={`${record.losses}L`} 
                                        size="small"
                                        className="matches-chip-loss"
                                    />
                                </Box>
                            </Box>
                            <MatchTable
                                data={seasonMatches}
                                sortColumn="match_date"
                            />
                        </Paper>
                    );
                })}
            </Container>
        </Box>
    );
};

export default Matches;
