import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import '../styles/playlistCardStyles.css';

const PlaylistCardSkeleton = () => {
    return (
        <Card className="playlist-card-modern">
            <Skeleton
                variant="rectangular"
                className="playlist-card-media-container"
                height={180}
                animation="wave"
            />
            <CardContent className="playlist-card-content-modern">
                <Box className="playlist-card-info">
                    <Skeleton
                        variant="text"
                        width="80%"
                        height={32}
                        animation="wave"
                    />
                    <Skeleton
                        variant="text"
                        width="100%"
                        height={20}
                        animation="wave"
                    />
                    <Skeleton
                        variant="text"
                        width="100%"
                        height={20}
                        animation="wave"
                    />
                    <Box
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginTop: '0.5rem',
                        }}
                    >
                        <Skeleton
                            variant="text"
                            width="30%"
                            height={24}
                            animation="wave"
                        />
                        <Skeleton
                            variant="rounded"
                            width="20%"
                            height={26}
                            animation="wave"
                        />
                    </Box>
                </Box>
                <Skeleton
                    variant="rounded"
                    width="100%"
                    height={42}
                    animation="wave"
                    style={{ marginTop: '1rem', borderRadius: '10px' }}
                />
            </CardContent>
        </Card>
    );
};

const PlaylistResultsSkeleton = ({ count = 8 }) => {
    return (
        <Box className="playlist-results-container">
            <Skeleton
                variant="text"
                width={150}
                height={24}
                animation="wave"
                style={{ marginBottom: '1.25rem' }}
            />
            <Grid container spacing={3}>
                {Array.from({ length: count }).map((_, index) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                        <PlaylistCardSkeleton />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default PlaylistResultsSkeleton;

