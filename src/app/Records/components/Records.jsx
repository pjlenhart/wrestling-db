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

const plural = (n, word) => `${n} ${word}${n === 1 ? '' : 's'}`;

// The API sends a row per wrestler per season, plus a 'Career' row with the
// totals. The page lists wrestlers: the career row, carrying the seasons it
// opens to, newest first. Bouts dated outside any season (a preseason club
// tournament in October, say) come as a season of null; they count toward
// the career, so they're listed last as the off-season.
export const OFF_SEASON = 'Off-season';
const bySeasonNewestFirst = (a, b) => {
    if (a.season === OFF_SEASON) return 1;
    if (b.season === OFF_SEASON) return -1;
    return b.season.localeCompare(a.season);
};

export const groupByWrestler = (records) => {
    const byId = new Map();
    (records || []).forEach((r) => {
        if (!byId.has(r.wrestler_id)) byId.set(r.wrestler_id, { career: null, seasons: [] });
        const entry = byId.get(r.wrestler_id);
        if (r.season === 'Career') entry.career = r;
        else entry.seasons.push(r.season ? r : { ...r, season: OFF_SEASON });
    });
    return [...byId.values()]
        .filter((entry) => entry.career)
        .map(({ career, seasons }) => ({
            ...career,
            seasons: [...seasons].sort(bySeasonNewestFirst),
        }));
};

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

    const wrestlers = useMemo(() => groupByWrestler(records), [records]);

    const { activeRecords, alumniRecords } = useMemo(() => {
        if (!canSplitRoster) {
            return { activeRecords: wrestlers, alumniRecords: [] };
        }
        const list = wrestlers;
        return {
            activeRecords: list.filter((r) =>
                activeWrestlerIds.has(r.wrestler_id)
            ),
            alumniRecords: list.filter(
                (r) => !activeWrestlerIds.has(r.wrestler_id)
            ),
        };
    }, [wrestlers, activeWrestlerIds, canSplitRoster]);

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
        const uniqueSeasons = new Set();
        rosterRecords.forEach((w) =>
            w.seasons.forEach((s) => s.season !== OFF_SEASON && uniqueSeasons.add(s.season)),
        );
        return [...uniqueSeasons].sort((a, b) => b.localeCompare(a));
    }, [rosterRecords]);

    // A season narrows the list to the wrestlers who competed that season.
    const filteredRecords = useMemo(() => {
        if (!rosterRecords) return [];

        return rosterRecords.filter((record) => {
            const matchesName = nameFilter === '' || 
                record.wrestler_name?.toLowerCase().includes(nameFilter.toLowerCase());
            const matchesSeason =
                seasonFilter === '' || record.seasons.some((s) => s.season === seasonFilter);
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
                subtitle="Career records for every Towson wrestler, season by season"
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
                                ? 'Records by Wrestler'
                                : showingActive
                                ? 'Active Roster Records'
                                : 'Alumni Records'}
                        </Typography>
                    </Box>
                    <Typography className="section-subtitle">
                        {!canSplitRoster
                            ? 'Career wins, losses, pins, and team points. Open a wrestler for their record by season'
                            : showingActive
                            ? 'Career wins, losses, pins, and team points for wrestlers on the roster. Open a wrestler for their record by season'
                            : 'Career wins, losses, pins, and team points for wrestlers who have finished at Towson. Open a wrestler for their record by season'}
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
                            {plural(rosterRecords.length, 'wrestler')}
                        </Typography>
                    </Box>

                    {/* Remounted per season so a season filter opens every
                        wrestler it shows, putting that season's record in view. */}
                    <RecordsTable
                        key={seasonFilter || 'all'}
                        wrestlers={filteredRecords}
                        expandAll={Boolean(seasonFilter)}
                    />
                </Paper>
            </Container>
        </Box>
    );
};

export default Records;
