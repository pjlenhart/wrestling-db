import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import '../styles/moveCardStyles.css';

const MoveCardSkeleton = () => {
    return (
        <Card className="move-card">
            {/* Thumbnail Skeleton */}
            <Skeleton
                variant="rectangular"
                className="move-card-image"
                animation="wave"
            />

            <CardContent className="move-card-content">
                <Box className="move-card-details">
                    {/* Position Skeleton */}
                    <Box className="move-card-detail-item">
                        <Skeleton
                            variant="text"
                            width="30%"
                            height={20}
                            animation="wave"
                        />
                        <Skeleton
                            variant="text"
                            width="60%"
                            height={20}
                            animation="wave"
                        />
                    </Box>

                    {/* Family Skeleton */}
                    <Box className="move-card-detail-item">
                        <Skeleton
                            variant="text"
                            width="25%"
                            height={20}
                            animation="wave"
                        />
                        <Skeleton
                            variant="text"
                            width="50%"
                            height={20}
                            animation="wave"
                        />
                    </Box>

                    {/* Tags Skeleton */}
                    <Box className="move-card-detail-item">
                        <Skeleton
                            variant="text"
                            width="20%"
                            height={20}
                            animation="wave"
                        />
                        <Skeleton
                            variant="text"
                            width="70%"
                            height={20}
                            animation="wave"
                        />
                    </Box>

                    {/* Notes Skeleton */}
                    <Box className="move-card-detail-item">
                        <Skeleton
                            variant="text"
                            width="25%"
                            height={20}
                            animation="wave"
                        />
                        <Skeleton
                            variant="text"
                            width="80%"
                            height={20}
                            animation="wave"
                        />
                        <Skeleton
                            variant="text"
                            width="65%"
                            height={20}
                            animation="wave"
                        />
                    </Box>
                </Box>

                {/* Button Skeleton */}
                <Skeleton
                    variant="rectangular"
                    width="100%"
                    height={45}
                    sx={{ borderRadius: '8px', marginTop: 'auto' }}
                    animation="wave"
                />
            </CardContent>
        </Card>
    );
};

export default MoveCardSkeleton;

