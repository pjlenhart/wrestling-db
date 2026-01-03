import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import PageHero from '../common/Header/PageHero';
import PlaylistResults from './components/PlaylistResults';
import PlaylistResultsSkeleton from './components/PlaylistResultsSkeleton';
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import './styles/matchPlaylistsStyles.css';
import '../common/styles/globalStyles.css';

const MatchPlaylists = ({ playlists, isLoading }) => {
    return (
        <Box className="modern-page">
            <PageHero
                title="Match Playlists"
                subtitle="Browse curated collections of wrestling matches"
            />

            <Container maxWidth="lg" className="page-content">
                {/* Results Section */}
                <Box className="match-playlists-results-section">
                    {isLoading ? (
                        <PlaylistResultsSkeleton count={8} />
                    ) : (
                        <PlaylistResults playlists={playlists} />
                    )}
                </Box>
            </Container>
        </Box>
    );
};

export default MatchPlaylists;

