import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import MoveCard from './MoveCard';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import '../styles/searchResultsStyles.css';

const SearchResults = (props) => {
    const { results, searchValue } = props;

    if (!results || results.length === 0) {
        return (
            <Paper className="search-results-empty-card" elevation={0}>
                <Box className="search-results-empty-content">
                    {searchValue ? (
                        <>
                            <SearchOffIcon className="search-results-empty-icon" />
                            <Typography className="search-results-empty-title">
                                No moves found
                            </Typography>
                            <Typography className="search-results-empty-text">
                                We couldn't find any moves matching "
                                {searchValue}". Try different keywords or clear
                                your search.
                            </Typography>
                        </>
                    ) : (
                        <>
                            <VideoLibraryIcon className="search-results-empty-icon available" />
                            <Typography className="search-results-empty-title">
                                No moves available
                            </Typography>
                            <Typography className="search-results-empty-text">
                                There are no moves in the database at this time.
                                Check back later!
                            </Typography>
                        </>
                    )}
                </Box>
            </Paper>
        );
    }

    return (
        <Box className="search-results-container">
            <Typography className="search-results-count">
                {results.length} move{results.length !== 1 ? 's' : ''} found
            </Typography>
            <Grid container spacing={3}>
                {results.map((move, index) => (
                    <Grid
                        item
                        xs={12}
                        sm={6}
                        md={4}
                        lg={3}
                        key={move.id || index}
                    >
                        <MoveCard move={move} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default SearchResults;
