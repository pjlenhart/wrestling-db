import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import PageHero from '../common/Header/PageHero';
import Search from '../common/Search/Search';
import SearchResults from './components/SearchResults';
import SearchResultsSkeleton from './components/SearchResultsSkeleton';
import { search } from '../services/movesService';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import './styles/moveSearchStyles.css';
import '../common/styles/globalStyles.css';

const MoveSearch = ({ videos }) => {
    const [searchValue, setSearchValue] = useState('');
    const [searchResults, setSearchResults] = useState(videos);
    const [isLoading, setIsLoading] = useState(false);

    // Update search results when videos prop changes (after initial load)
    useEffect(() => {
        if (videos && videos.length > 0 && searchResults.length === 0) {
            setSearchResults(videos);
        }
    }, [videos]);

    const handleSearch = async (value) => {
        setSearchValue(value);

        if (!value.trim()) {
            setSearchResults(videos);
            setIsLoading(false);
            return;
        }

        try {
            setIsLoading(true);
            const response = await search(value);

            // Add a minimum delay to show skeletons (500ms)
            await new Promise((resolve) => setTimeout(resolve, 500));

            const data = response?.data || [];
            setSearchResults(data);
        } catch (error) {
            console.error('Search error:', error);
            setSearchResults([]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleClear = () => {
        setSearchResults(videos);
        setSearchValue('');
        setIsLoading(false);
    };

    return (
        <Box className="modern-page">
            <PageHero
                title="Move Search"
                subtitle="Discover wrestling techniques, tutorials, and demonstrations"
            />

            <Container maxWidth="lg" className="page-content">
                {/* Search Section */}
                <Paper className="move-search-card" elevation={0}>
                    <Box className="move-search-header">
                        <VideoLibraryIcon className="move-search-icon" />
                        <Box>
                            <Typography className="move-search-title">
                                Find Wrestling Moves
                            </Typography>
                            <Typography className="move-search-subtitle">
                                Search by move name, position, or keyword to
                                find tutorials
                            </Typography>
                        </Box>
                    </Box>

                    <Search
                        placeholder="Search for a wrestling move..."
                        onSearch={handleSearch}
                        onClear={handleClear}
                        searchButtonText={<SearchIcon />}
                        clearButtonText={<ClearIcon />}
                        showClearButton={true}
                        className="move-search-input-container"
                    />
                </Paper>

                {/* Results Section */}
                <Box className="move-search-results-section">
                    {searchValue && (
                        <Typography className="move-search-results-label">
                            {isLoading
                                ? 'Searching...'
                                : `Results for "${searchValue}"`}
                        </Typography>
                    )}

                    {isLoading ? (
                        <SearchResultsSkeleton count={8} />
                    ) : (
                        <SearchResults
                            results={searchResults}
                            searchValue={searchValue}
                        />
                    )}
                </Box>
            </Container>
        </Box>
    );
};

export default MoveSearch;
