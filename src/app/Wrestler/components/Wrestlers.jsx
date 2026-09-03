import React, { useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import PageHero from '../../common/Header/PageHero';
import RosterTable from '../../Home/components/RosterTable';
import '../styles/wrestlerStyles.css';
import '../../common/styles/globalStyles.css';
import GroupsIcon from '@mui/icons-material/Groups';
import HistoryIcon from '@mui/icons-material/History';

const Wrestlers = (props) => {
    const { roster } = props;

    // Active first: these are the wrestlers picking up new results week to week,
    // so they are what somebody landing here almost always wants.
    const [activeTab, setActiveTab] = useState('active');

    const { active, alumni } = useMemo(() => {
        const list = roster || [];
        return {
            active: list.filter((w) => w.active_roster === 1),
            alumni: list.filter((w) => w.active_roster !== 1),
        };
    }, [roster]);

    const showingActive = activeTab === 'active';
    const shown = showingActive ? active : alumni;

    return (
        <Box className="modern-page">
            <PageHero
                title="Wrestler Directory"
                subtitle="Browse all Towson wrestlers - click a name to explore their profile"
            />

            <Container maxWidth="lg" className="page-content">
                <Paper className="content-card" elevation={0}>
                    <Box className="segmented-tabs">
                        <button
                            type="button"
                            className={`segmented-tab ${
                                showingActive ? 'active' : ''
                            }`}
                            onClick={() => setActiveTab('active')}
                            aria-pressed={showingActive}
                        >
                            <GroupsIcon className="segmented-tab-icon" />
                            Active Wrestlers
                            <span className="segmented-tab-count">
                                {active.length}
                            </span>
                        </button>
                        <button
                            type="button"
                            className={`segmented-tab ${
                                showingActive ? '' : 'active'
                            }`}
                            onClick={() => setActiveTab('alumni')}
                            aria-pressed={!showingActive}
                        >
                            <HistoryIcon className="segmented-tab-icon" />
                            Alumni
                            <span className="segmented-tab-count">
                                {alumni.length}
                            </span>
                        </button>
                    </Box>

                    <Box className="section-header">
                        {showingActive ? (
                            <GroupsIcon className="section-title-icon" />
                        ) : (
                            <HistoryIcon className="section-title-icon" />
                        )}
                        <Typography className="section-title">
                            {showingActive
                                ? 'Active Roster'
                                : 'Former Towson Wrestlers'}
                        </Typography>
                    </Box>
                    <Typography className="section-subtitle">
                        {showingActive
                            ? "Wrestlers currently on the roster. Click a wrestler's name to view their statistics and match history."
                            : "Wrestlers who have finished their Towson careers. Click a name to look back at their statistics and match history."}
                    </Typography>

                    {shown.length === 0 ? (
                        <Typography className="section-subtitle">
                            {showingActive
                                ? 'No wrestlers are on the active roster right now.'
                                : 'No alumni on record yet.'}
                        </Typography>
                    ) : (
                        <RosterTable
                            data={shown}
                            sortColumn="wrestler_name"
                            showStatus={false}
                        />
                    )}
                </Paper>
            </Container>
        </Box>
    );
};

export default Wrestlers;
