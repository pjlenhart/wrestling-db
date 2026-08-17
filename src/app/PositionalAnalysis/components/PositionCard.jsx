import React, { useMemo } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import LinearProgress from '@mui/material/LinearProgress';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import SportsKabaddiIcon from '@mui/icons-material/SportsKabaddi';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { calculatePositionalAnalysisFromMatches, generateInsights } from './PositionCalculations';

const PositionCard = ({ wrestlerName, season, matchData }) => {
    const analysis = useMemo(() => {
        return calculatePositionalAnalysisFromMatches(matchData);
    }, [matchData]);

    const insights = useMemo(() => {
        return generateInsights(analysis);
    }, [analysis]);

    if (!analysis) {
        return (
            <Paper elevation={2} sx={{ p: 3 }}>
                <Typography variant="body2" color="textSecondary">
                    No match data available for this wrestler-season combination.
                </Typography>
            </Paper>
        );
    }

    const getRatingColor = (rating) => {
        switch (rating) {
            case 'Excellent':
                return 'success';
            case 'Good':
                return 'primary';
            case 'Average':
                return 'warning';
            case 'Needs Work':
                return 'warning';
            case 'Weak':
                return 'error';
            default:
                return 'default';
        }
    };

    const formatPercent = (rate) => {
        if (rate === undefined || rate === null || isNaN(rate)) return '0%';
        return `${Math.round(rate * 100)}%`;
    };

    return (
        <Paper 
            elevation={3} 
            sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 6,
                }
            }}
        >
            {/* Card Header */}
            <Box 
                sx={{ 
                    p: 2.5, 
                    bgcolor: '#800000',
                    color: 'white',
                    borderRadius: '4px 4px 0 0'
                }}
            >
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                    {wrestlerName}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    {season} Season ({analysis.totalMatches} matches analyzed)
                </Typography>
            </Box>

            {/* Summary Section */}
            <Box sx={{ p: 2.5, bgcolor: '#f5f5f5' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <EmojiEventsIcon sx={{ color: '#FFD700', fontSize: 20 }} />
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        Strongest Position: {analysis.strongestPosition}
                    </Typography>
                </Box>
                <Typography variant="body2" color="textSecondary">
                    Ranking: {analysis.positionRanking.join(' > ')}
                </Typography>
            </Box>

            <Divider />

            {/* Position Analysis Grid */}
            <Box sx={{ p: 2.5, flex: 1 }}>
                <Grid container spacing={2}>
                    {/* NEUTRAL POSITION */}
                    <Grid item xs={12}>
                        <Box 
                            sx={{ 
                                p: 2, 
                                borderRadius: 2,
                                border: '2px solid #2196F3',
                                bgcolor: 'rgba(33, 150, 243, 0.05)',
                                minHeight: 220,
                                display: 'flex',
                                flexDirection: 'column'
                            }}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                                <SportsKabaddiIcon sx={{ color: '#2196F3', fontSize: 20 }} />
                                <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#2196F3' }}>
                                    Neutral Position
                                </Typography>
                            </Box>

                            <Box sx={{ mb: 1.5 }}>
                                <Typography variant="h4" sx={{ color: '#2196F3', fontWeight: 600 }}>
                                    {formatPercent(analysis.neutral.neutralWinRate)}
                                </Typography>
                                <Typography variant="caption" color="textSecondary">
                                    Neutral Win Rate
                                </Typography>
                            </Box>

                            <Chip 
                                label={analysis.neutral.rating}
                                color={getRatingColor(analysis.neutral.rating)}
                                size="small"
                                sx={{ mb: 1.5 }}
                            />

                            <Box sx={{ mb: 1, flex: 1 }}>
                                <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
                                    <strong>TDs per match:</strong> {analysis.neutral.takedownRate.toFixed(1)}
                                </Typography>
                                <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
                                    <strong>Scored first TD:</strong> {formatPercent(analysis.neutral.firstScoreRate)} of matches
                                </Typography>
                                <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
                                    <strong>TD record:</strong> {analysis.neutral.totalTakedowns} for, {analysis.neutral.totalTakedownsAgainst} against
                                </Typography>
                                <Typography variant="body2" sx={{ fontSize: '0.85rem', color: '#666' }}>
                                    Won {analysis.neutral.neutralWins}, Lost {analysis.neutral.neutralLosses}, Even {analysis.neutral.neutralEven}
                                </Typography>
                            </Box>

                            <Box sx={{ mt: 'auto' }}>
                                <Typography variant="caption" color="textSecondary" sx={{ display: 'block', mb: 0.5 }}>
                                    Position Strength
                                </Typography>
                                <LinearProgress 
                                    variant="determinate" 
                                    value={Math.min(100, analysis.neutral.neutralWinRate * 100)} 
                                    sx={{
                                        height: 8,
                                        borderRadius: 1,
                                        bgcolor: '#e3f2fd',
                                        '& .MuiLinearProgress-bar': {
                                            bgcolor: '#2196F3',
                                            borderRadius: 1
                                        }
                                    }}
                                />
                            </Box>
                        </Box>
                    </Grid>

                    {/* BOTTOM POSITION */}
                    <Grid item xs={12}>
                        <Box 
                            sx={{ 
                                p: 2, 
                                borderRadius: 2,
                                border: '2px solid #F44336',
                                bgcolor: 'rgba(244, 67, 54, 0.05)',
                                minHeight: 220,
                                display: 'flex',
                                flexDirection: 'column'
                            }}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                                <ArrowDownwardIcon sx={{ color: '#F44336', fontSize: 20 }} />
                                <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#F44336' }}>
                                    Bottom Position
                                </Typography>
                            </Box>

                            {analysis.bottom.neverTakenDown ? (
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                                    <CheckCircleIcon sx={{ color: '#4CAF50' }} />
                                    <Typography variant="body1" sx={{ color: '#4CAF50', fontWeight: 600 }}>
                                        Never Taken Down!
                                    </Typography>
                                </Box>
                            ) : (
                                <>
                                    <Box sx={{ mb: 1.5 }}>
                                        <Typography variant="h4" sx={{ color: '#F44336', fontWeight: 600 }}>
                                            {formatPercent(analysis.bottom.escapeRate)}
                                        </Typography>
                                        <Typography variant="caption" color="textSecondary">
                                            Escape Rate
                                        </Typography>
                                    </Box>

                                    <Chip 
                                        label={analysis.bottom.rating}
                                        color={getRatingColor(analysis.bottom.rating)}
                                        size="small"
                                        sx={{ mb: 1.5 }}
                                    />
                                </>
                            )}

                            <Box sx={{ mb: 1, flex: 1 }}>
                                <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
                                    <strong>Put on bottom:</strong> {analysis.bottom.matchesOnBottom} of {analysis.bottom.matchCount} matches
                                </Typography>
                                {!analysis.bottom.neverTakenDown && (
                                    <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
                                        <strong>Escaped in:</strong> {analysis.bottom.matchesEscaped} matches
                                    </Typography>
                                )}
                                <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
                                    <strong>Gave up near falls:</strong> {analysis.bottom.matchesTurned} matches
                                </Typography>
                            </Box>

                            {/* Always reserve space for pinned warning to maintain consistent height */}
                            <Box sx={{ minHeight: 40, display: 'flex', alignItems: 'center' }}>
                                {analysis.bottom.matchesPinned > 0 ? (
                                    <Box 
                                        sx={{ 
                                            display: 'flex', 
                                            alignItems: 'center', 
                                            gap: 0.5, 
                                            p: 1,
                                            bgcolor: '#ffebee',
                                            borderRadius: 1,
                                            width: '100%'
                                        }}
                                    >
                                        <WarningIcon sx={{ fontSize: 16, color: '#f44336' }} />
                                        <Typography variant="caption" sx={{ color: '#c62828' }}>
                                            Pinned in {analysis.bottom.matchesPinned} match{analysis.bottom.matchesPinned > 1 ? 'es' : ''}
                                        </Typography>
                                    </Box>
                                ) : (
                                    <Box 
                                        sx={{ 
                                            display: 'flex', 
                                            alignItems: 'center', 
                                            gap: 0.5, 
                                            p: 1,
                                            bgcolor: '#e8f5e9',
                                            borderRadius: 1,
                                            width: '100%'
                                        }}
                                    >
                                        <CheckCircleIcon sx={{ fontSize: 16, color: '#4CAF50' }} />
                                        <Typography variant="caption" sx={{ color: '#2e7d32' }}>
                                            No pins given up
                                        </Typography>
                                    </Box>
                                )}
                            </Box>

                            <Box sx={{ mt: 'auto' }}>
                                <Typography variant="caption" color="textSecondary" sx={{ display: 'block', mb: 0.5 }}>
                                    Position Strength
                                </Typography>
                                <LinearProgress 
                                    variant="determinate" 
                                    value={analysis.bottom.neverTakenDown ? 100 : Math.min(100, analysis.bottom.escapeRate * 100)} 
                                    sx={{
                                        height: 8,
                                        borderRadius: 1,
                                        bgcolor: analysis.bottom.neverTakenDown ? '#e8f5e9' : '#ffebee',
                                        '& .MuiLinearProgress-bar': {
                                            bgcolor: analysis.bottom.neverTakenDown ? '#4CAF50' : '#F44336',
                                            borderRadius: 1
                                        }
                                    }}
                                />
                            </Box>
                        </Box>
                    </Grid>

                    {/* TOP POSITION */}
                    <Grid item xs={12}>
                        <Box 
                            sx={{ 
                                p: 2, 
                                borderRadius: 2,
                                border: '2px solid #4CAF50',
                                bgcolor: 'rgba(76, 175, 80, 0.05)',
                                minHeight: 220,
                                display: 'flex',
                                flexDirection: 'column'
                            }}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                                <ArrowUpwardIcon sx={{ color: '#4CAF50', fontSize: 20 }} />
                                <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#4CAF50' }}>
                                    Top Position
                                </Typography>
                            </Box>

                            {analysis.top.neverOnTop ? (
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                                    <WarningIcon sx={{ color: '#ff9800' }} />
                                    <Typography variant="body1" sx={{ color: '#ff9800', fontWeight: 600 }}>
                                        No Top Time (need takedowns)
                                    </Typography>
                                </Box>
                            ) : (
                                <>
                                    <Box sx={{ mb: 1.5 }}>
                                        <Typography variant="h4" sx={{ color: '#4CAF50', fontWeight: 600 }}>
                                            {formatPercent(analysis.top.controlRate)}
                                        </Typography>
                                        <Typography variant="caption" color="textSecondary">
                                            Control Rate
                                        </Typography>
                                    </Box>

                                    <Chip 
                                        label={analysis.top.rating}
                                        color={getRatingColor(analysis.top.rating)}
                                        size="small"
                                        sx={{ mb: 1.5 }}
                                    />
                                </>
                            )}

                            <Box sx={{ mb: 1, flex: 1 }}>
                                <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
                                    <strong>On top in:</strong> {analysis.top.matchesOnTop} of {analysis.top.matchCount} matches
                                </Typography>
                                {!analysis.top.neverOnTop && (
                                    <>
                                        <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
                                            <strong>Kept control:</strong> {analysis.top.matchesKeptControl} matches
                                        </Typography>
                                        <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
                                            <strong>Scored near falls:</strong> {analysis.top.matchesScoredTurns} matches ({analysis.top.totalNearFalls} total)
                                        </Typography>
                                    </>
                                )}
                                <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
                                    <strong>Pins:</strong> {analysis.top.totalPins > 0 ? (
                                        <>{analysis.top.topPins} from top{analysis.top.quickPins > 0 && ` (${analysis.top.quickPins} quick from neutral)`}</>
                                    ) : '0'}
                                </Typography>
                                <Typography variant="body2" sx={{ fontSize: '0.85rem', color: '#666' }}>
                                    Opponent escaped/reversed {analysis.top.opponentEscapes || 0} times
                                </Typography>
                            </Box>

                            <Box sx={{ mt: 'auto' }}>
                                <Typography variant="caption" color="textSecondary" sx={{ display: 'block', mb: 0.5 }}>
                                    Position Strength
                                </Typography>
                                <LinearProgress 
                                    variant="determinate" 
                                    value={analysis.top.neverOnTop ? 0 : Math.min(100, analysis.top.controlRate * 100)} 
                                    sx={{
                                        height: 8,
                                        borderRadius: 1,
                                        bgcolor: '#e8f5e9',
                                        '& .MuiLinearProgress-bar': {
                                            bgcolor: '#4CAF50',
                                            borderRadius: 1
                                        }
                                    }}
                                />
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>

            {/* Insights Section - Always rendered for consistent height */}
            <Divider />
            <Box sx={{ p: 2.5, bgcolor: '#fff3e0', minHeight: 140, display: 'flex', flexDirection: 'column' }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: '#e65100' }}>
                    Insights & Recommendations
                </Typography>
                {insights.length > 0 ? (
                    <Box component="ul" sx={{ m: 0, pl: 2.5, flex: 1 }}>
                        {insights.slice(0, 5).map((insight, index) => (
                            <Typography 
                                key={index}
                                component="li"
                                variant="body2" 
                                sx={{ 
                                    fontSize: '0.85rem',
                                    mb: 0.5,
                                    color: '#424242'
                                }}
                            >
                                {insight}
                            </Typography>
                        ))}
                    </Box>
                ) : (
                    <Typography variant="body2" sx={{ color: '#757575', fontStyle: 'italic' }}>
                        No specific insights for this season.
                    </Typography>
                )}
            </Box>
        </Paper>
    );
};

export default PositionCard;
