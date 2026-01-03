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
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import MovieIcon from '@mui/icons-material/Movie';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import TheatersIcon from '@mui/icons-material/Theaters';
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

    // Get colorful icon and gradient based on playlist id
    const getIconAndColor = (playlistId) => {
        const icons = [
            { 
                icon: VideoLibraryIcon, 
                gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: '#667eea'
            },
            { 
                icon: MovieIcon, 
                gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                color: '#f093fb'
            },
            { 
                icon: SlideshowIcon, 
                gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                color: '#4facfe'
            },
            { 
                icon: TheatersIcon, 
                gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                color: '#43e97b'
            },
            { 
                icon: PlaylistPlayIcon, 
                gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
                color: '#fa709a'
            },
            { 
                icon: VideoLibraryIcon, 
                gradient: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
                color: '#30cfd0'
            },
            { 
                icon: MovieIcon, 
                gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
                color: '#a8edea'
            },
            { 
                icon: TheatersIcon, 
                gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
                color: '#ff9a9e'
            },
        ];
        
        // Use ID to consistently pick an icon/color combo
        const index = playlistId ? Math.abs(playlistId) % icons.length : 0;
        return icons[index];
    };

    const iconConfig = getIconAndColor(id);
    const IconComponent = iconConfig.icon;

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
                        sx={{ background: iconConfig.gradient }}
                    >
                        <IconComponent className="playlist-card-placeholder-icon" />
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

