import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import MoveCard from './MoveCard';
import '../styles/searchResultsStyles.css';

const SearchResults = (props) => {
    const { results, searchValue } = props;

    if (!results || results.length === 0) {
        return (
            <Box className="search-results-empty">
                <Typography className="search-results-empty-text">
                    {searchValue
                        ? 'No moves found matching your search. Try different keywords or clear your search.'
                        : 'No moves available at this time.'}
                </Typography>
            </Box>
        );
    }

    return (
        <Grid container spacing={3} className="search-results-grid">
            {results.map((move) => (
                <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    lg={3}
                    key={move.id || move.url}
                >
                    <MoveCard move={move} />
                </Grid>
            ))}
        </Grid>
    );
};

export default SearchResults;
