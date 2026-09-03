import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import '../styles/playlistCardStyles.css';

const PlaylistCard = (props) => {
    const { playlist } = props;
    const { url, name, description, matchCount, id, createdAt, updatedAt } = playlist;

    // Extract video thumbnail from YouTube URL
    const getThumbnail = (videoUrl) => {
        if (!videoUrl) return null;

        // YouTube playlist thumbnail extraction
        const youtubePlaylistRegex = /[?&]list=([^&]+)/;
        const playlistMatch = videoUrl.match(youtubePlaylistRegex);
        
        if (playlistMatch && playlistMatch[1]) {
            // For playlists, we can try to get a thumbnail from the first video
            // But since we don't have that info, we'll return null and show placeholder
            return null;
        }

        // Check if it's a regular video URL
        const youtubeVideoRegex =
            /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
        const videoMatch = videoUrl.match(youtubeVideoRegex);
        if (videoMatch && videoMatch[1]) {
            return `https://img.youtube.com/vi/${videoMatch[1]}/mqdefault.jpg`;
        }

        return null;
    };

    const thumbnail = getThumbnail(url);

    // Thumbnail fallback art. Previously eight unrelated neon gradients keyed off
    // the id; now three tonal variants of the brand palette, so a wall of cards
    // still has rhythm without turning into a rainbow.
    const getPlaceholderStyle = (playlistId) => {
        const variants = [
            'linear-gradient(135deg, #800000 0%, #4a0000 100%)',
            'linear-gradient(135deg, #3a3a3f 0%, #232327 100%)',
            'linear-gradient(135deg, #5c0000 0%, #2b2023 100%)',
        ];
        const index = playlistId ? Math.abs(playlistId) % variants.length : 0;
        return variants[index];
    };

    const placeholderGradient = getPlaceholderStyle(id);

    const handleOpenLink = () => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    // Format date for display
    const formatDate = (dateString) => {
        if (!dateString) return null;
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric' 
            });
        } catch {
            return null;
        }
    };

    // Extract text after date pattern in name
    const getDisplayNameFromPattern = (nameString) => {
        if (!nameString) return 'Match Playlist';
        
        // Match pattern like "2025-12-18-EasternTech" and extract "EasternTech"
        const datePatternRegex = /^\d{4}-\d{2}-\d{2}-(.+)$/;
        const match = nameString.match(datePatternRegex);
        
        if (match && match[1]) {
            let extracted = match[1];
            
            // Remove leading/trailing dashes or underscores
            extracted = extracted.replace(/^[-_]+|[-_]+$/g, '');
            
            // Convert camelCase or PascalCase to spaces
            // e.g., "EasternTech" -> "Eastern Tech"
            extracted = extracted.replace(/([a-z])([A-Z])/g, '$1 $2');
            
            // Replace dashes and underscores with spaces
            extracted = extracted.replace(/[-_]/g, ' ');
            
            // Clean up multiple spaces
            extracted = extracted.replace(/\s+/g, ' ').trim();
            
            return extracted || 'Match Playlist';
        }
        
        // If no pattern match, return the original name or default
        return nameString || 'Match Playlist';
    };

    return (
        <Card className="playlist-card-modern">
            <Box className="playlist-card-media-container">
                {thumbnail ? (
                    <>
                        <CardMedia
                            component="img"
                            className="playlist-card-thumbnail"
                            image={thumbnail}
                            alt="Playlist thumbnail"
                        />
                        <Box className="playlist-card-play-overlay">
                            <PlayCircleOutlineIcon className="playlist-card-play-icon" />
                        </Box>
                    </>
                ) : (
                    <Box 
                        className="playlist-card-placeholder-modern"
                        sx={{ background: placeholderGradient }}
                    >
                        <PlaylistPlayIcon className="playlist-card-placeholder-icon" />
                        <Typography className="playlist-card-placeholder-text">
                            {getDisplayNameFromPattern(name)}
                        </Typography>
                    </Box>
                )}
            </Box>

            <CardContent className="playlist-card-content-modern">
                <Box className="playlist-card-info">
                    {name && (
                        <Box className="playlist-card-name-section">
                            <Typography className="playlist-card-name">
                                {name}
                            </Typography>
                        </Box>
                    )}

                    {description && (
                        <Box className="playlist-card-description">
                            <Typography className="playlist-card-description-text">
                                {description}
                            </Typography>
                        </Box>
                    )}

                    {matchCount !== undefined && matchCount !== null && (
                        <Box className="playlist-card-row">
                            <Typography className="playlist-card-label">
                                Matches
                            </Typography>
                            <Chip
                                label={matchCount}
                                size="small"
                                className="playlist-card-chip"
                            />
                        </Box>
                    )}

                    {(createdAt || updatedAt) && (
                        <Box className="playlist-card-dates">
                            {createdAt && (
                                <Typography className="playlist-card-date-text">
                                    <span className="playlist-card-date-label">Created:</span> {formatDate(createdAt)}
                                </Typography>
                            )}
                            {updatedAt && (
                                <Typography className="playlist-card-date-text">
                                    <span className="playlist-card-date-label">Updated:</span> {formatDate(updatedAt)}
                                </Typography>
                            )}
                        </Box>
                    )}
                </Box>

                <Button
                    variant="contained"
                    className="playlist-card-button-modern"
                    onClick={handleOpenLink}
                    endIcon={<OpenInNewIcon />}
                    fullWidth
                >
                    Watch Playlist
                </Button>
            </CardContent>
        </Card>
    );
};

export default PlaylistCard;

