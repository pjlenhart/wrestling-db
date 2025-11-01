import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';

const FeaturedContent = (props) => {
    const { featureItems: items } = props;
    const [selectedItemIndex, setSelectedItemIndex] = useState(0);

    const handleItemClick = (ind) => {
        setSelectedItemIndex(ind);
    };

    return (
        <Container id="features" className="featured-container">
            <Grid container spacing={6}>
                <Grid item xs={12} md={6}>
                    <div>
                        <Typography
                            component="h2"
                            variant="h4"
                            color="text.primary"
                        >
                            Highlights
                        </Typography>
                        <Typography
                            variant="body1"
                            color="text.secondary"
                            className="featured-highlights-desc"
                        >
                            Check out some highlights of our site!
                        </Typography>
                    </div>
                    <Grid
                        container
                        item
                        gap={1}
                        className="featured-chip-container"
                    >
                        {items.map(({ title }, index) => (
                            <Chip
                                key={index}
                                label={title}
                                onClick={() => handleItemClick(index)}
                                className={`featured-chip ${selectedItemIndex === index ? 'selected' : ''}`}
                            />
                        ))}
                    </Grid>
                    {/* <Box
                        component={Card}
                        variant="outlined"
                        sx={{
                            display: { xs: 'auto', sm: 'none' },
                            mt: 4,
                        }}
                    >
                        <Box
                            sx={{
                                backgroundImage: (theme) =>
                                    theme.palette.mode === 'light'
                                        ? items[selectedItemIndex].imageLight
                                        : items[selectedItemIndex].imageDark,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                minHeight: 280,
                            }}
                        />
                        <Box sx={{ px: 2, pb: 2 }}>
                            <Typography
                                color="text.primary"
                                variant="body2"
                                fontWeight="bold"
                            >
                                {items[selectedItemIndex].title}
                            </Typography>
                            <Typography
                                color="text.secondary"
                                variant="body2"
                                sx={{ my: 0.5 }}
                            >
                                {items[selectedItemIndex].description}
                            </Typography>
                            {items[selectedItemIndex].link ? (
                                <Link
                                    color="primary"
                                    variant="body2"
                                    fontWeight="bold"
                                    href={items[selectedItemIndex].link}
                                    sx={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        '& > svg': { transition: '0.2s' },
                                        '&:hover > svg': {
                                            transform: 'translateX(2px)',
                                        },
                                    }}
                                >
                                    <span>See more</span>
                                    <ChevronRightRoundedIcon
                                        fontSize="small"
                                        sx={{ mt: '1px', ml: '2px' }}
                                    />
                                </Link>
                            ) : null}
                        </Box>
                    </Box> */}
                    <Stack
                        direction="column"
                        justifyContent="center"
                        alignItems="flex-start"
                        spacing={2}
                        useFlexGap
                        className="featured-stack"
                    >
                        {items.map(
                            ({ icon, title, description, link }, index) => (
                                <Card
                                    key={index}
                                    component={Button}
                                    onClick={() => handleItemClick(index)}
                                    className={`featured-card ${selectedItemIndex === index ? 'selected' : ''}`}
                                >
                                    <Box className="featured-card-content">
                                        <Box className={`featured-icon ${selectedItemIndex === index ? 'selected' : ''}`}>
                                            {icon}
                                        </Box>
                                        <div>
                                            <Typography
                                                color="text.primary"
                                                variant="body2"
                                                fontWeight="bold"
                                            >
                                                {title}
                                            </Typography>
                                            <Typography
                                                color="text.secondary"
                                                variant="body2"
                                                className="featured-description-margin"
                                            >
                                                {description}
                                            </Typography>
                                            {link ? (
                                                <Link
                                                    color="primary"
                                                    variant="body2"
                                                    fontWeight="bold"
                                                    href={link}
                                                    className="featured-link"
                                                >
                                                    <span>See more</span>
                                                    <ChevronRightRoundedIcon fontSize="small" />
                                                </Link>
                                            ) : null}
                                        </div>
                                    </Box>
                                </Card>
                            )
                        )}
                    </Stack>
                </Grid>
                <Grid
                    item
                    xs={12}
                    md={6}
                >
                    <Card className="featured-content-display">
                        {items[selectedItemIndex].content}
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
};

export default FeaturedContent;
