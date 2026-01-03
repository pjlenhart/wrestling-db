import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import PlaylistCard from './PlaylistCard';
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import '../styles/playlistResultsStyles.css';

const PlaylistResults = (props) => {
    const { playlists } = props;

    if (!playlists || playlists.length === 0) {
        return (
            <Paper className="playlist-results-empty-card" elevation={0}>
                <Box className="playlist-results-empty-content">
                    <PlaylistPlayIcon className="playlist-results-empty-icon" />
                    <Typography className="playlist-results-empty-title">
                        No playlists available
                    </Typography>
                    <Typography className="playlist-results-empty-text">
                        There are no match playlists in the database at this
                        time. Check back later!
                    </Typography>
                </Box>
            </Paper>
        );
    }

    return (
        <Box className="playlist-results-container">
            <Typography className="playlist-results-count">
                {playlists.length} playlist{playlists.length !== 1 ? 's' : ''}{' '}
                available
            </Typography>
            <Grid container spacing={3}>
                {playlists.map((playlist, index) => (
                    <Grid
                        item
                        xs={12}
                        sm={6}
                        md={4}
                        lg={3}
                        key={playlist.id || index}
                    >
                        <PlaylistCard playlist={playlist} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default PlaylistResults;

