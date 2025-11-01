import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
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

        // Default placeholder
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
        <Card className="move-card">
            {isInstagramLink ? (
                <Box className="move-card-instagram-placeholder">
                    <svg
                        className="move-card-instagram-logo"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                    >
                        <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z" />
                    </svg>
                </Box>
            ) : thumbnail ? (
                <CardMedia
                    component="img"
                    className="move-card-image"
                    image={thumbnail}
                    alt="Move thumbnail"
                />
            ) : (
                <Box className="move-card-placeholder">
                    <Typography
                        variant="h6"
                        className="move-card-placeholder-text"
                    >
                        Wrestling Move
                    </Typography>
                </Box>
            )}

            <CardContent className="move-card-content">
                <Box className="move-card-details">
                    {position && (
                        <Box className="move-card-detail-item">
                            <Typography className="move-card-detail-label">
                                Position:
                            </Typography>
                            <Typography className="move-card-detail-value">
                                {capitalizeWords(position)}
                            </Typography>
                        </Box>
                    )}

                    {family && (
                        <Box className="move-card-detail-item">
                            <Typography className="move-card-detail-label">
                                Family:
                            </Typography>
                            <Typography className="move-card-detail-value">
                                {capitalizeWords(family)}
                            </Typography>
                        </Box>
                    )}

                    {tags && tags.length > 0 && (
                        <Box className="move-card-detail-item">
                            <Typography className="move-card-detail-label">
                                Tags:
                            </Typography>
                            <Typography className="move-card-detail-value">
                                {Array.isArray(tags) ? tags.join(', ') : tags}
                            </Typography>
                        </Box>
                    )}

                    {notes && (
                        <Box className="move-card-detail-item">
                            <Typography className="move-card-detail-label">
                                Notes:
                            </Typography>
                            <Typography className="move-card-detail-value">
                                {capitalizeWords(notes)}
                            </Typography>
                        </Box>
                    )}

                    {related && related.length > 0 && (
                        <Box className="move-card-detail-item">
                            <Typography className="move-card-detail-label">
                                Related:
                            </Typography>
                            <Typography className="move-card-detail-value">
                                {Array.isArray(related)
                                    ? related
                                          .map((r) => capitalizeWords(r))
                                          .join(', ')
                                    : capitalizeWords(related)}
                            </Typography>
                        </Box>
                    )}
                </Box>

                <Button
                    variant="contained"
                    className="move-card-button"
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
