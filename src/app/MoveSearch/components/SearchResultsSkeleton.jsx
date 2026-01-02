import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import MoveCardSkeleton from './MoveCardSkeleton';
import '../styles/searchResultsStyles.css';

const SearchResultsSkeleton = ({ count = 8 }) => {
    return (
        <Box className="search-results-container">
            <Skeleton
                variant="text"
                width={120}
                height={24}
                animation="wave"
                sx={{ marginBottom: '1.25rem' }}
            />

            <Grid container spacing={3}>
                {Array.from({ length: count }).map((_, index) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                        <MoveCardSkeleton />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default SearchResultsSkeleton;
