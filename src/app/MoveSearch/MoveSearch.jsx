import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import PageHeader from '../common/Header/PageHeader';
import Search from '../common/Search/Search';
import SearchResults from './components/SearchResults';
import SearchResultsSkeleton from './components/SearchResultsSkeleton';
import { search } from '../services/movesService';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import './styles/moveSearchStyles.css';

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
        <>
            <PageHeader header="Move Search" />
            <Container className="move-search-page-container">
                <Box className="move-search-content">
                    <Typography className="move-search-description">
                        Discover wrestling techniques, tutorials, and
                        demonstrations. Search by move name or keyword to find
                        what you're looking for.
                    </Typography>
                    <br />
                    <Search
                        placeholder="Search for a wrestling move..."
                        onSearch={handleSearch}
                        onClear={handleClear}
                        searchButtonText={<SearchIcon />}
                        clearButtonText={<ClearIcon />}
                        showClearButton={true}
                        className="centered prominent"
                    />

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
        </>
    );
};

export default MoveSearch;
