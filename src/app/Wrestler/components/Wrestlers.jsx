import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import PageHero from '../../common/Header/PageHero';
import RosterTable from '../../Home/components/RosterTable';
import '../styles/wrestlerStyles.css';
import '../../common/styles/globalStyles.css';
import GroupsIcon from '@mui/icons-material/Groups';

const Wrestlers = (props) => {
    const { roster } = props;

    return (
        <Box className="modern-page">
            <PageHero 
                title="Wrestler Directory" 
                subtitle="Browse all Towson wrestlers - click a name to explore their profile"
            />
            
            <Container maxWidth="lg" className="page-content">
                <Paper className="content-card" elevation={0}>
                    <Box className="section-header">
                        <GroupsIcon className="section-title-icon" />
                        <Typography className="section-title">
                            All Towson Wrestlers
                        </Typography>
                    </Box>
                    <Typography className="section-subtitle">
                        Click on a wrestler's name to view their detailed statistics and match history
                    </Typography>
                    <RosterTable data={roster} sortColumn="wrestler_name" />
                </Paper>
            </Container>
        </Box>
    );
};

export default Wrestlers;
