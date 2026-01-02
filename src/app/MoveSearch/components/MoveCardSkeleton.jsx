import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import '../styles/moveCardStyles.css';

const MoveCardSkeleton = () => {
    return (
        <Card className="move-card-modern" sx={{ boxShadow: '0 2px 12px rgba(0, 0, 0, 0.06)' }}>
            {/* Thumbnail Skeleton */}
            <Box className="move-card-media-container">
                <Skeleton
                    variant="rectangular"
                    width="100%"
                    height="100%"
                    animation="wave"
                />
            </Box>

            <CardContent className="move-card-content-modern">
                <Box className="move-card-info">
                    {/* Position Skeleton */}
                    <Box className="move-card-row">
                        <Skeleton variant="text" width={60} height={20} animation="wave" />
                        <Skeleton variant="rounded" width={80} height={26} animation="wave" />
                    </Box>

                    {/* Family Skeleton */}
                    <Box className="move-card-row">
                        <Skeleton variant="text" width={50} height={20} animation="wave" />
                        <Skeleton variant="rounded" width={70} height={26} animation="wave" />
                    </Box>

                    {/* Tags Skeleton */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                        <Skeleton variant="text" width={40} height={20} animation="wave" />
                        <Box sx={{ display: 'flex', gap: 0.5 }}>
                            <Skeleton variant="rounded" width={50} height={26} animation="wave" />
                            <Skeleton variant="rounded" width={60} height={26} animation="wave" />
                            <Skeleton variant="rounded" width={45} height={26} animation="wave" />
                        </Box>
                    </Box>

                    {/* Notes Skeleton */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                        <Skeleton variant="text" width={45} height={20} animation="wave" />
                        <Skeleton variant="text" width="90%" height={18} animation="wave" />
                        <Skeleton variant="text" width="70%" height={18} animation="wave" />
                    </Box>
                </Box>

                {/* Button Skeleton */}
                <Skeleton
                    variant="rectangular"
                    width="100%"
                    height={44}
                    sx={{ borderRadius: '10px' }}
                    animation="wave"
                />
            </CardContent>
        </Card>
    );
};

export default MoveCardSkeleton;
