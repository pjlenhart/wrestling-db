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

const Records = (props) => {
    const { records } = props;
    
    // Filter states
    const [nameFilter, setNameFilter] = useState('');
    const [seasonFilter, setSeasonFilter] = useState('');

    // Get unique seasons for the dropdown
    const seasons = useMemo(() => {
        if (!records || records.length === 0) return [];
        const uniqueSeasons = [...new Set(records.map((r) => r.season))];
        // Sort seasons in reverse order (newest first), but keep "Career" at the end
        return uniqueSeasons.sort((a, b) => {
            if (a === 'Career') return 1;
            if (b === 'Career') return -1;
            return b.localeCompare(a);
        });
    }, [records]);

    // Filter records based on name and season
    const filteredRecords = useMemo(() => {
        if (!records) return [];
        
        return records.filter((record) => {
            const matchesName = nameFilter === '' || 
                record.wrestler_name?.toLowerCase().includes(nameFilter.toLowerCase());
            const matchesSeason = seasonFilter === '' || 
                record.season === seasonFilter;
            return matchesName && matchesSeason;
        });
    }, [records, nameFilter, seasonFilter]);

    const handleClearFilters = () => {
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
                    
                    {/* Filter Section */}
                    <Box className="records-filter-section">
                        <TextField
                            label="Search by Name"
                            variant="outlined"
                            size="small"
                            value={nameFilter}
                            onChange={(e) => setNameFilter(e.target.value)}
                            className="records-filter-input"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon sx={{ color: '#800000' }} />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{
                                minWidth: 200,
                                '& .MuiOutlinedInput-root': {
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#800000',
                                    },
                                },
                                '& .MuiInputLabel-root.Mui-focused': {
                                    color: '#800000',
                                },
                            }}
                        />
                        
                        <FormControl 
                            size="small" 
                            sx={{ 
                                minWidth: 150,
                                '& .MuiOutlinedInput-root': {
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#800000',
                                    },
                                },
                                '& .MuiInputLabel-root.Mui-focused': {
                                    color: '#800000',
                                },
                            }}
                        >
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
                            <Typography 
                                onClick={handleClearFilters}
                                sx={{ 
                                    color: '#800000', 
                                    cursor: 'pointer',
                                    fontSize: '0.875rem',
                                    textDecoration: 'underline',
                                    '&:hover': {
                                        color: '#5c0000',
                                    },
                                }}
                            >
                                Clear Filters
                            </Typography>
                        )}

                        <Typography 
                            sx={{ 
                                color: '#666', 
                                fontSize: '0.875rem',
                                marginLeft: 'auto',
                            }}
                        >
                            Showing {filteredRecords.length} of {records?.length || 0} records
                        </Typography>
                    </Box>

                    <RecordsTable records={filteredRecords} />
                </Paper>
            </Container>
        </Box>
    );
};

export default Records;
