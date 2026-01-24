import React, { useState, useMemo } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import PageHero from '../common/Header/PageHero';
import PositionCard from './components/PositionCard';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import InfoIcon from '@mui/icons-material/Info';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PersonIcon from '@mui/icons-material/Person';
import '../common/styles/globalStyles.css';
import './styles/positionalAnalysisStyles.css';

const PositionalAnalysis = ({ 
    wrestlers, 
    careerStats, 
    regularSeasonMatches, 
    individualMatches, 
    isLoading 
}) => {
    const [selectedWrestlers, setSelectedWrestlers] = useState([]);
    const [selectedSeasons, setSelectedSeasons] = useState([]);

    // Combine all matches
    const allMatches = useMemo(() => {
        return [...(regularSeasonMatches || []), ...(individualMatches || [])];
    }, [regularSeasonMatches, individualMatches]);

    // Get unique seasons from career stats (excluding "Career")
    const availableSeasons = useMemo(() => {
        if (!careerStats || careerStats.length === 0) return [];
        const uniqueSeasons = [...new Set(careerStats.map(s => s.season))];
        return uniqueSeasons
            .filter(season => season !== 'Career')
            .sort((a, b) => b.localeCompare(a)); // Sort newest first for dropdown
    }, [careerStats]);

    // Generate analysis cards for single wrestler (sorted oldest to newest for display)
    const analysisCards = useMemo(() => {
        if (selectedWrestlers.length === 0 || selectedSeasons.length === 0) {
            return [];
        }

        // Only used for single wrestler view
        if (selectedWrestlers.length > 1) {
            return [];
        }

        const wrestler = selectedWrestlers[0];
        // Sort seasons chronologically (oldest first = left side)
        const sortedSeasons = [...selectedSeasons].sort((a, b) => a.localeCompare(b));
        
        const cards = [];
        sortedSeasons.forEach(season => {
            const wrestlerMatches = allMatches.filter(match => 
                match.wrestler_id === wrestler.wrestler_id && 
                match.season === season
            );

            if (wrestlerMatches.length > 0) {
                cards.push({
                    id: `${wrestler.wrestler_id}-${season}`,
                    wrestlerId: wrestler.wrestler_id,
                    wrestlerName: wrestler.wrestler_name,
                    season: season,
                    matchData: wrestlerMatches
                });
            }
        });

        return cards;
    }, [selectedWrestlers, selectedSeasons, allMatches]);

    // Group cards by wrestler for accordion display (multiple wrestlers)
    const cardsByWrestler = useMemo(() => {
        if (selectedWrestlers.length <= 1 || selectedSeasons.length === 0) {
            return null;
        }
        
        const grouped = {};
        selectedWrestlers.forEach(wrestler => {
            // Sort seasons chronologically (oldest first = left)
            const sortedSeasons = [...selectedSeasons].sort((a, b) => a.localeCompare(b));
            
            const wrestlerCards = [];
            sortedSeasons.forEach(season => {
                const matches = allMatches.filter(m => 
                    m.wrestler_id === wrestler.wrestler_id && m.season === season
                );
                if (matches.length > 0) {
                    wrestlerCards.push({
                        id: `${wrestler.wrestler_id}-${season}`,
                        season,
                        matchData: matches
                    });
                }
            });
            
            if (wrestlerCards.length > 0) {
                grouped[wrestler.wrestler_id] = {
                    wrestlerName: wrestler.wrestler_name,
                    cards: wrestlerCards
                };
            }
        });
        return Object.keys(grouped).length > 0 ? grouped : null;
    }, [selectedWrestlers, selectedSeasons, allMatches]);

    // Count total cards for display
    const totalCardCount = useMemo(() => {
        if (selectedWrestlers.length === 1) {
            return analysisCards.length;
        }
        if (cardsByWrestler) {
            return Object.values(cardsByWrestler).reduce((sum, w) => sum + w.cards.length, 0);
        }
        return 0;
    }, [selectedWrestlers.length, analysisCards, cardsByWrestler]);

    const handleClearFilters = () => {
        setSelectedWrestlers([]);
        setSelectedSeasons([]);
    };

    const hasSelections = selectedWrestlers.length > 0 || selectedSeasons.length > 0;
    const hasData = totalCardCount > 0;

    if (isLoading) {
        return (
            <Box className="modern-page">
                <PageHero 
                    title="Positional Analysis" 
                    subtitle="Loading data..."
                />
                <Container maxWidth="xl" className="page-content">
                    <Paper className="content-card" elevation={0}>
                        <Grid container spacing={2}>
                            {[1, 2, 3, 4].map((i) => (
                                <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
                                    <Skeleton variant="rectangular" height={600} />
                                </Grid>
                            ))}
                        </Grid>
                    </Paper>
                </Container>
            </Box>
        );
    }

    return (
        <Box className="modern-page">
            <PageHero 
                title="Positional Analysis" 
                subtitle="Analyze wrestler performance in neutral, top, and bottom positions"
            />

            <Container maxWidth="xl" className="page-content">
                {/* Filter Section */}
                <Paper className="content-card" elevation={0}>
                    <Box className="section-header">
                        <TrendingUpIcon className="section-title-icon" />
                        <Typography className="section-title">
                            Select Wrestlers & Seasons
                        </Typography>
                    </Box>
                    <Typography className="section-subtitle" sx={{ mb: 3 }}>
                        Choose one or multiple wrestlers and seasons to analyze their positional strengths
                    </Typography>

                    <Grid container spacing={3} sx={{ mb: 2 }}>
                        <Grid item xs={12} md={6}>
                            <Autocomplete
                                multiple
                                id="wrestler-select"
                                options={wrestlers || []}
                                getOptionLabel={(option) => option.wrestler_name}
                                value={selectedWrestlers}
                                onChange={(event, newValue) => {
                                    setSelectedWrestlers(newValue);
                                }}
                                isOptionEqualToValue={(option, value) => 
                                    option.wrestler_id === value.wrestler_id
                                }
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Select Wrestlers"
                                        placeholder="Choose wrestlers..."
                                        sx={{
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
                                )}
                                sx={{
                                    '& .MuiChip-root': {
                                        bgcolor: '#800000',
                                        color: 'white',
                                    },
                                }}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Autocomplete
                                multiple
                                id="season-select"
                                options={availableSeasons}
                                getOptionLabel={(option) => option}
                                value={selectedSeasons}
                                onChange={(event, newValue) => {
                                    setSelectedSeasons(newValue);
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Select Seasons"
                                        placeholder="Choose seasons..."
                                        sx={{
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
                                )}
                                sx={{
                                    '& .MuiChip-root': {
                                        bgcolor: '#800000',
                                        color: 'white',
                                    },
                                }}
                            />
                        </Grid>
                    </Grid>

                    {hasSelections && (
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                            <Typography variant="body2" color="textSecondary">
                                {hasData 
                                    ? `Showing ${totalCardCount} analysis card${totalCardCount !== 1 ? 's' : ''}${selectedWrestlers.length > 1 ? ` for ${selectedWrestlers.length} wrestlers` : ''}`
                                    : 'No match data available for selected combination'
                                }
                            </Typography>
                            <Button
                                startIcon={<ClearIcon />}
                                onClick={handleClearFilters}
                                sx={{ 
                                    color: '#800000',
                                    '&:hover': {
                                        bgcolor: 'rgba(128, 0, 0, 0.04)',
                                    }
                                }}
                            >
                                Clear Selections
                            </Button>
                        </Box>
                    )}
                </Paper>

                {/* Methodology Info Box */}
                <Accordion 
                    elevation={0}
                    sx={{ 
                        mb: 3,
                        border: '1px solid #e0e0e0',
                        borderRadius: '8px !important',
                        '&:before': { display: 'none' },
                        '&.Mui-expanded': { margin: '0 0 24px 0' }
                    }}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon sx={{ color: '#800000' }} />}
                        sx={{ 
                            bgcolor: '#fafafa',
                            borderRadius: '8px',
                            '&.Mui-expanded': { 
                                borderRadius: '8px 8px 0 0',
                                borderBottom: '1px solid #e0e0e0'
                            }
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <InfoIcon sx={{ color: '#800000', fontSize: 20 }} />
                            <Typography sx={{ fontWeight: 600, color: '#424242' }}>
                                How We Calculate Position Strength
                            </Typography>
                        </Box>
                    </AccordionSummary>
                    <AccordionDetails sx={{ p: 3 }}>
                        <Typography variant="body2" paragraph sx={{ color: '#424242' }}>
                            This analysis examines each individual match to determine how well a wrestler 
                            performs in the three folkstyle wrestling positions.
                        </Typography>
                        
                        <Box sx={{ mb: 2 }}>
                            <Typography variant="subtitle2" sx={{ color: '#2196F3', fontWeight: 600, mb: 0.5 }}>
                                NEUTRAL
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#666' }}>
                                Every match starts in neutral. We measure the <strong>Neutral Win Rate</strong> - 
                                the percentage of matches where you scored more or equal takedowns than your opponent. 
                                We also track average takedowns per match. A wrestler who consistently wins the 
                                takedown battle is strong in neutral.
                            </Typography>
                        </Box>

                        <Box sx={{ mb: 2 }}>
                            <Typography variant="subtitle2" sx={{ color: '#F44336', fontWeight: 600, mb: 0.5 }}>
                                BOTTOM
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#666' }}>
                                When taken down, can you get back up? We measure the <strong>Escape Rate</strong> - 
                                the percentage of matches where you escaped or reversed after being taken down. 
                                We only count matches where you were actually put on bottom. Getting turned for 
                                near falls or pinned indicates bottom weakness.
                            </Typography>
                        </Box>

                        <Box sx={{ mb: 2 }}>
                            <Typography variant="subtitle2" sx={{ color: '#4CAF50', fontWeight: 600, mb: 0.5 }}>
                                TOP
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#666' }}>
                                After scoring a takedown, can you keep them down? We measure the <strong>Control Rate</strong> - 
                                the percentage of matches where your opponent couldn't escape your control. 
                                We also track turning ability (near falls) and finishing (pins). Quick pins 
                                (1st period, single takedown) count toward neutral prowess, not top position.
                            </Typography>
                        </Box>

                        <Typography variant="caption" sx={{ color: '#999', fontStyle: 'italic' }}>
                            Note: Forfeits are excluded from all calculations as they don't involve wrestling action.
                        </Typography>
                    </AccordionDetails>
                </Accordion>

                {/* Empty State */}
                {!hasData && (
                    <Paper 
                        className="content-card" 
                        elevation={0}
                        sx={{ 
                            textAlign: 'center',
                            py: 8,
                            bgcolor: '#f5f5f5'
                        }}
                    >
                        <SearchIcon sx={{ fontSize: 80, color: '#bdbdbd', mb: 2 }} />
                        <Typography variant="h6" gutterBottom>
                            {hasSelections 
                                ? 'No Match Data Available' 
                                : 'Select Wrestlers and Seasons to Begin'
                            }
                        </Typography>
                        <Typography variant="body2" color="textSecondary" sx={{ maxWidth: 500, mx: 'auto' }}>
                            {hasSelections
                                ? 'No match data found for the selected wrestler-season combinations. Try different selections.'
                                : 'Use the filters above to select one or more wrestlers and seasons to analyze their positional strengths and weaknesses in neutral, top, and bottom positions.'
                            }
                        </Typography>
                    </Paper>
                )}

                {/* Single Wrestler - Flat Grid (4 cards per row, oldest to newest left to right) */}
                {selectedWrestlers.length === 1 && analysisCards.length > 0 && (
                    <Grid container spacing={2}>
                        {analysisCards.map((card) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={card.id}>
                                <PositionCard
                                    wrestlerName={card.wrestlerName}
                                    season={card.season}
                                    matchData={card.matchData}
                                />
                            </Grid>
                        ))}
                    </Grid>
                )}

                {/* Multiple Wrestlers - Accordions for each wrestler */}
                {selectedWrestlers.length > 1 && cardsByWrestler && (
                    <Box>
                        {Object.entries(cardsByWrestler).map(([wrestlerId, data]) => (
                            <Accordion 
                                key={wrestlerId}
                                defaultExpanded
                                elevation={0}
                                sx={{ 
                                    mb: 2, 
                                    border: '1px solid #e0e0e0', 
                                    borderRadius: '8px !important',
                                    '&:before': { display: 'none' },
                                    '&.Mui-expanded': { margin: '0 0 16px 0' }
                                }}
                            >
                                <AccordionSummary 
                                    expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
                                    sx={{ 
                                        bgcolor: '#800000',
                                        color: 'white',
                                        borderRadius: '8px',
                                        '&.Mui-expanded': { 
                                            borderRadius: '8px 8px 0 0'
                                        },
                                        '& .MuiAccordionSummary-expandIconWrapper': {
                                            transition: 'transform 0.3s ease',
                                        },
                                        '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
                                            transform: 'rotate(180deg)',
                                        }
                                    }}
                                >
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                        <PersonIcon />
                                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                            {data.wrestlerName}
                                        </Typography>
                                        <Typography variant="body2" sx={{ opacity: 0.8 }}>
                                            ({data.cards.length} season{data.cards.length !== 1 ? 's' : ''})
                                        </Typography>
                                    </Box>
                                </AccordionSummary>
                                <AccordionDetails sx={{ p: 2, bgcolor: '#fafafa' }}>
                                    <Grid container spacing={2}>
                                        {data.cards.map(card => (
                                            <Grid item xs={12} sm={6} md={4} lg={3} key={card.id}>
                                                <PositionCard
                                                    wrestlerName={data.wrestlerName}
                                                    season={card.season}
                                                    matchData={card.matchData}
                                                />
                                            </Grid>
                                        ))}
                                    </Grid>
                                </AccordionDetails>
                            </Accordion>
                        ))}
                    </Box>
                )}
            </Container>
        </Box>
    );
};

export default PositionalAnalysis;
