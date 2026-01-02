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
import '../styles/moveCardStyles.css';

const MoveCard = (props) => {
    const { move } = props;
    const { url, position, family, tags, notes, related, id } = move;

    // Check if URL is Instagram
    const isInstagram = (videoUrl) => {
        return videoUrl && videoUrl.includes('instagram.com');
    };

    // Extract video thumbnail from YouTube URL
    const getThumbnail = (videoUrl) => {
        if (!videoUrl) return null;

        // YouTube thumbnail extraction
        const youtubeRegex =
            /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
        const youtubeMatch = videoUrl.match(youtubeRegex);
        if (youtubeMatch && youtubeMatch[1]) {
            return `https://img.youtube.com/vi/${youtubeMatch[1]}/mqdefault.jpg`;
        }

        return null;
    };

    // Capitalize first letter of each word
    const capitalizeWords = (text) => {
        if (!text) return text;
        return text
            .split(' ')
            .map(
                (word) =>
                    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
            )
            .join(' ');
    };

    const thumbnail = getThumbnail(url);
    const isInstagramLink = isInstagram(url);

    const handleOpenLink = () => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    return (
        <Card className="move-card-modern">
            <Box className="move-card-media-container">
                {isInstagramLink ? (
                    <Box className="move-card-instagram">
                        <svg
                            className="move-card-instagram-icon"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                        >
                            <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z" />
                        </svg>
                        <Typography className="move-card-source-label">
                            Instagram
                        </Typography>
                    </Box>
                ) : thumbnail ? (
                    <>
                        <CardMedia
                            component="img"
                            className="move-card-thumbnail"
                            image={thumbnail}
                            alt="Move thumbnail"
                        />
                        <Box className="move-card-play-overlay">
                            <PlayCircleOutlineIcon className="move-card-play-icon" />
                        </Box>
                    </>
                ) : (
                    <Box className="move-card-placeholder-modern">
                        <PlayCircleOutlineIcon className="move-card-placeholder-icon" />
                        <Typography className="move-card-placeholder-text">
                            Wrestling Move
                        </Typography>
                    </Box>
                )}
            </Box>

            <CardContent className="move-card-content-modern">
                <Box className="move-card-info">
                    {position && (
                        <Box className="move-card-row">
                            <Typography className="move-card-label">
                                Position
                            </Typography>
                            <Chip
                                label={capitalizeWords(position)}
                                size="small"
                                className="move-card-chip position"
                            />
                        </Box>
                    )}

                    {family && (
                        <Box className="move-card-row">
                            <Typography className="move-card-label">
                                Family
                            </Typography>
                            <Chip
                                label={capitalizeWords(family)}
                                size="small"
                                className="move-card-chip family"
                            />
                        </Box>
                    )}

                    {tags && tags.length > 0 && (
                        <Box className="move-card-tags">
                            <Typography className="move-card-label">
                                Tags
                            </Typography>
                            <Box className="move-card-tags-list">
                                {(Array.isArray(tags) ? tags : [tags])
                                    .slice(0, 3)
                                    .map((tag, index) => (
                                        <Chip
                                            key={index}
                                            label={capitalizeWords(tag)}
                                            size="small"
                                            className="move-card-chip tag"
                                        />
                                    ))}
                            </Box>
                        </Box>
                    )}

                    {notes && (
                        <Box className="move-card-notes">
                            <Typography className="move-card-label">
                                Notes
                            </Typography>
                            <Typography className="move-card-notes-text">
                                {notes}
                            </Typography>
                        </Box>
                    )}
                </Box>

                <Button
                    variant="contained"
                    className="move-card-button-modern"
                    onClick={handleOpenLink}
                    endIcon={<OpenInNewIcon />}
                    fullWidth
                >
                    Watch Video
                </Button>
            </CardContent>
        </Card>
    );
};

export default MoveCard;
