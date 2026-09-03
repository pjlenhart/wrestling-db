import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Skeleton from '@mui/material/Skeleton';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

const BestRecords = ({ bestRecords, isLoading }) => {
    // Rank tiers drive the medal accent in CSS (.rank-1/2/3); ranks 4+ stay neutral
    // so the podium reads at a glance without three competing row colors.
    const getRankClass = (index) =>
        index < 3 ? ` rank-${index + 1}` : '';

    if (isLoading) {
        return (
            <Box className="top-pinners-container">
                <Typography variant="h5" className="top-pinners-title">
                    <EmojiEventsIcon className="top-pinners-title-icon" />
                    Best Records All Time
                </Typography>
                <Typography variant="body2" className="top-pinners-subtitle">
                    Career Records
                </Typography>
                <Box className="top-pinners-list">
                    {[...Array(5)].map((_, index) => (
                        <Paper
                            key={index}
                            className="top-pinner-card"
                            elevation={0}
                        >
                            <Skeleton
                                variant="circular"
                                width={28}
                                height={28}
                            />
                            <Box className="top-pinner-info">
                                <Skeleton
                                    variant="text"
                                    width={120}
                                    height={24}
                                />
                                <Skeleton
                                    variant="text"
                                    width={80}
                                    height={18}
                                />
                            </Box>
                            <Skeleton
                                variant="rounded"
                                width={50}
                                height={36}
                            />
                        </Paper>
                    ))}
                </Box>
            </Box>
        );
    }

    if (!bestRecords || bestRecords.length === 0) {
        return (
            <Box className="top-pinners-container">
                <Typography variant="h5" className="top-pinners-title">
                    <EmojiEventsIcon className="top-pinners-title-icon" />
                    Best Records All Time
                </Typography>
                <Typography variant="body2" className="top-pinners-subtitle">
                    Career Records
                </Typography>
                <Paper className="top-pinners-empty" elevation={0}>
                    <Typography variant="body1" color="text.secondary">
                        No career record data available yet.
                    </Typography>
                </Paper>
            </Box>
        );
    }

    return (
        <Box className="top-pinners-container">
            <Typography variant="h5" className="top-pinners-title">
                <EmojiEventsIcon className="top-pinners-title-icon" />
                Best Records All Time
            </Typography>
            <Typography variant="body2" className="top-pinners-subtitle">
                Career Records
            </Typography>
            <Box className="top-pinners-list">
                {bestRecords.map((wrestler, index) => (
                    <Paper
                        key={wrestler.wrestler_id || index}
                        className={`top-pinner-card${getRankClass(index)}`}
                        elevation={0}
                    >
                        <Box className="top-pinner-rank">
                            <Typography
                                variant="body1"
                                className="top-pinner-rank-text"
                            >
                                {index + 1}
                            </Typography>
                        </Box>
                        <Box className="top-pinner-info">
                            <Typography
                                variant="body1"
                                className="top-pinner-name"
                            >
                                {wrestler.wrestler_name}
                            </Typography>
                        </Box>
                        <Box className="top-pinner-pins wide">
                            <Typography
                                variant="h5"
                                className="top-pinner-pins-count"
                            >
                                {wrestler.wins}-{wrestler.losses}
                            </Typography>
                            <Typography
                                variant="caption"
                                className="top-pinner-pins-label"
                            >
                                RECORD
                            </Typography>
                        </Box>
                    </Paper>
                ))}
            </Box>
        </Box>
    );
};

export default BestRecords;
