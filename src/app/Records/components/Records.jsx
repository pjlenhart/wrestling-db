import React, { useState, useMemo } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import PageHero from '../../common/Header/PageHero';
import RecordsTable from './RecordsTable';
import '../styles/recordStyles.css';
import '../../common/styles/globalStyles.css';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import GroupsIcon from '@mui/icons-material/Groups';
import HistoryIcon from '@mui/icons-material/History';

const Records = (props) => {
    const { records, activeWrestlerIds } = props;

    // Active first: these wrestlers pick up new results week to week, so that
    // is what somebody landing here almost always wants.
    const [rosterTab, setRosterTab] = useState('active');

    // Filter states
    const [nameFilter, setNameFilter] = useState('');
    const [seasonFilter, setSeasonFilter] = useState('');

    // Without the roster there is nothing to split on, so the tabs come off
    // and the page behaves as it did before.
    const canSplitRoster = activeWrestlerIds instanceof Set;

    const { activeRecords, alumniRecords } = useMemo(() => {
        if (!canSplitRoster) {
            return { activeRecords: records || [], alumniRecords: [] };
        }
        const list = records || [];
        return {
            activeRecords: list.filter((r) =>
                activeWrestlerIds.has(r.wrestler_id)
            ),
            alumniRecords: list.filter(
                (r) => !activeWrestlerIds.has(r.wrestler_id)
            ),
        };
    }, [records, activeWrestlerIds, canSplitRoster]);

    const showingActive = rosterTab === 'active';

    // Memoised so it keeps a stable identity: the season list and the filtered
    // rows below both depend on it, and a fresh array every render would make
    // their useMemos recompute for nothing.
    const rosterRecords = useMemo(() => {
        if (!canSplitRoster) return activeRecords;
        return showingActive ? activeRecords : alumniRecords;
    }, [canSplitRoster, showingActive, activeRecords, alumniRecords]);

    // Seasons come from the visible tab so the dropdown never offers a season
    // that would return nothing.
    const seasons = useMemo(() => {
        if (!rosterRecords || rosterRecords.length === 0) return [];
        const uniqueSeasons = [...new Set(rosterRecords.map((r) => r.season))];
        // Sort seasons in reverse order (newest first), but keep "Career" at the end
        return uniqueSeasons.sort((a, b) => {
            if (a === 'Career') return 1;
            if (b === 'Career') return -1;
            return b.localeCompare(a);
        });
    }, [rosterRecords]);

    // Filter records based on name and season
    const filteredRecords = useMemo(() => {
        if (!rosterRecords) return [];

        return rosterRecords.filter((record) => {
            const matchesName = nameFilter === '' || 
                record.wrestler_name?.toLowerCase().includes(nameFilter.toLowerCase());
            const matchesSeason = seasonFilter === '' || 
                record.season === seasonFilter;
            return matchesName && matchesSeason;
        });
    }, [rosterRecords, nameFilter, seasonFilter]);

    const handleClearFilters = () => {
        setNameFilter('');
        setSeasonFilter('');
    };

    // The two tabs do not share a season list, so a filter carried across would
    // silently empty the table.
    const handleTabChange = (tab) => {
        setRosterTab(tab);
        setNameFilter('');
        setSeasonFilter('');
    };

    return (
        <Box className="modern-page">
            <PageHero
                title="Records"
                subtitle="Career statistics and records for all Towson wrestlers by season"
            />

            <Container maxWidth="lg" className="page-content">
                <Paper className="content-card" elevation={0}>
                    {canSplitRoster && (
                        <Box className="segmented-tabs">
                            <button
                                type="button"
                                className={`segmented-tab ${
                                    showingActive ? 'active' : ''
                                }`}
                                onClick={() => handleTabChange('active')}
                                aria-pressed={showingActive}
                            >
                                <GroupsIcon className="segmented-tab-icon" />
                                Active Wrestlers
                                <span className="segmented-tab-count">
                                    {activeRecords.length}
                                </span>
                            </button>
                            <button
                                type="button"
                                className={`segmented-tab ${
                                    showingActive ? '' : 'active'
                                }`}
                                onClick={() => handleTabChange('alumni')}
                                aria-pressed={!showingActive}
                            >
                                <HistoryIcon className="segmented-tab-icon" />
                                Alumni
                                <span className="segmented-tab-count">
                                    {alumniRecords.length}
                                </span>
                            </button>
                        </Box>
                    )}

                    <Box className="section-header">
                        <EmojiEventsIcon className="section-title-icon" />
                        <Typography className="section-title">
                            {!canSplitRoster
                                ? 'Records by Wrestler, by Year'
                                : showingActive
                                ? 'Active Roster Records'
                                : 'Alumni Records'}
                        </Typography>
                    </Box>
                    <Typography className="section-subtitle">
                        {!canSplitRoster
                            ? 'View wins, losses, pins, and team points earned for each wrestler across all seasons'
                            : showingActive
                            ? 'Wins, losses, pins, and team points for wrestlers currently on the roster'
                            : 'Wins, losses, pins, and team points for wrestlers who have finished their Towson careers'}
                    </Typography>
                    
                    {/* Filter Section - .app-fields carries the shared field styling,
                        so the per-field colour overrides are no longer needed here. */}
                    <Box className="records-filter-section app-fields">
                        <TextField
                            label="Search by Name"
                            variant="outlined"
                            value={nameFilter}
                            onChange={(e) => setNameFilter(e.target.value)}
                            className="records-filter-input"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon
                                            sx={{
                                                color: 'var(--color-gray-500)',
                                                fontSize: 20,
                                            }}
                                        />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{ minWidth: 220 }}
                        />

                        <FormControl sx={{ minWidth: 160 }}>
                            <InputLabel>Season</InputLabel>
                            <Select
                                value={seasonFilter}
                                label="Season"
                                onChange={(e) => setSeasonFilter(e.target.value)}
                            >
                                <MenuItem value="">
                                    <em>All Seasons</em>
                                </MenuItem>
                                {seasons.map((season) => (
                                    <MenuItem key={season} value={season}>
                                        {season}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        {(nameFilter || seasonFilter) && (
                            <button
                                type="button"
                                onClick={handleClearFilters}
                                className="records-clear-filters"
                            >
                                Clear filters
                            </button>
                        )}

                        <Typography className="records-filter-count">
                            Showing {filteredRecords.length} of{' '}
                            {rosterRecords.length} records
                        </Typography>
                    </Box>

                    <RecordsTable records={filteredRecords} />
                </Paper>
            </Container>
        </Box>
    );
};

export default Records;
