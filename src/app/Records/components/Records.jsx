import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import PageHero from '../../common/Header/PageHero';
import RecordsTable from './RecordsTable';
import '../styles/recordStyles.css';
import '../../common/styles/globalStyles.css';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

const Records = (props) => {
    const { records } = props;

    return (
        <Box className="modern-page">
            <PageHero
                title="Records"
                subtitle="Career statistics and records for all Towson wrestlers by season"
            />

            <Container maxWidth="lg" className="page-content">
                <Paper className="content-card" elevation={0}>
                    <Box className="section-header">
                        <EmojiEventsIcon className="section-title-icon" />
                        <Typography className="section-title">
                            Records by Wrestler, by Year
                        </Typography>
                    </Box>
                    <Typography className="section-subtitle">
                        View wins, losses, pins, and team points earned for each
                        wrestler across all seasons
                    </Typography>
                    <RecordsTable records={records} />
                </Paper>
            </Container>
        </Box>
    );
};

export default Records;
