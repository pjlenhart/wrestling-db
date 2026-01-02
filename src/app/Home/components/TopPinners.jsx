import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Skeleton from '@mui/material/Skeleton';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

const TopPinners = ({ topPinners, isLoading }) => {
    const getMedalColor = (index) => {
        switch (index) {
            case 0:
                return '#FFD700'; // Gold
            case 1:
                return '#C0C0C0'; // Silver
            case 2:
                return '#CD7F32'; // Bronze
            default:
                return '#800000'; // Maroon for 4th and 5th
        }
    };

    const getBackgroundGradient = (index) => {
        switch (index) {
            case 0:
                return 'linear-gradient(135deg, rgba(255, 215, 0, 0.15) 0%, rgba(255, 215, 0, 0.05) 100%)';
            case 1:
                return 'linear-gradient(135deg, rgba(192, 192, 192, 0.15) 0%, rgba(192, 192, 192, 0.05) 100%)';
            case 2:
                return 'linear-gradient(135deg, rgba(205, 127, 50, 0.15) 0%, rgba(205, 127, 50, 0.05) 100%)';
            default:
                return 'linear-gradient(135deg, rgba(128, 0, 0, 0.08) 0%, rgba(128, 0, 0, 0.02) 100%)';
        }
    };

    if (isLoading) {
        return (
            <Box className="top-pinners-container">
                <Typography variant="h5" className="top-pinners-title">
                    <EmojiEventsIcon className="top-pinners-title-icon" />
                    Top Pin Leaders
                </Typography>
                <Typography variant="body2" className="top-pinners-subtitle">
                    2025-2026 Season
                </Typography>
                <Box className="top-pinners-list">
                    {[...Array(5)].map((_, index) => (
                        <Paper key={index} className="top-pinner-card" elevation={0}>
                            <Skeleton variant="circular" width={36} height={36} />
                            <Box className="top-pinner-info">
                                <Skeleton variant="text" width={120} height={24} />
                                <Skeleton variant="text" width={80} height={18} />
                            </Box>
                            <Skeleton variant="rounded" width={50} height={36} />
                        </Paper>
                    ))}
                </Box>
            </Box>
        );
    }

    if (!topPinners || topPinners.length === 0) {
        return (
            <Box className="top-pinners-container">
                <Typography variant="h5" className="top-pinners-title">
                    <EmojiEventsIcon className="top-pinners-title-icon" />
                    Top Pin Leaders
                </Typography>
                <Typography variant="body2" className="top-pinners-subtitle">
                    2025-2026 Season
                </Typography>
                <Paper className="top-pinners-empty" elevation={0}>
                    <Typography variant="body1" color="text.secondary">
                        No pin data available for this season yet.
                    </Typography>
                </Paper>
            </Box>
        );
    }

    return (
        <Box className="top-pinners-container">
            <Typography variant="h5" className="top-pinners-title">
                <EmojiEventsIcon className="top-pinners-title-icon" />
                Top Pin Leaders
            </Typography>
            <Typography variant="body2" className="top-pinners-subtitle">
                2025-2026 Season
            </Typography>
            <Box className="top-pinners-list">
                {topPinners.map((wrestler, index) => (
                    <Paper
                        key={wrestler.wrestler_id || index}
                        className="top-pinner-card"
                        elevation={0}
                        sx={{
                            background: getBackgroundGradient(index),
                            borderLeft: `4px solid ${getMedalColor(index)}`,
                        }}
                    >
                        <Box
                            className="top-pinner-rank"
                            sx={{ backgroundColor: getMedalColor(index) }}
                        >
                            <Typography variant="body1" className="top-pinner-rank-text">
                                {index + 1}
                            </Typography>
                        </Box>
                        <Box className="top-pinner-info">
                            <Typography variant="body1" className="top-pinner-name">
                                {wrestler.wrestler_name}
                            </Typography>
                            <Typography variant="body2" className="top-pinner-record">
                                {wrestler.wins}W - {wrestler.losses}L
                            </Typography>
                        </Box>
                        <Box className="top-pinner-pins">
                            <Typography variant="h5" className="top-pinner-pins-count">
                                {wrestler.wins_by_pin}
                            </Typography>
                            <Typography variant="caption" className="top-pinner-pins-label">
                                PINS
                            </Typography>
                        </Box>
                    </Paper>
                ))}
            </Box>
        </Box>
    );
};

export default TopPinners;

