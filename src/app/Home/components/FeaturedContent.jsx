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
        <Container id="features" sx={{ py: { xs: 2, sm: 4 } }}>
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
                            sx={{ mb: { xs: 2, sm: 4 } }}
                        >
                            Check out some highlights of our site!
                        </Typography>
                    </div>
                    <Grid
                        container
                        item
                        gap={1}
                        sx={{ display: { xs: 'auto', sm: 'none' } }}
                    >
                        {items.map(({ title }, index) => (
                            <Chip
                                key={index}
                                label={title}
                                onClick={() => handleItemClick(index)}
                                sx={{
                                    borderColor: (theme) => {
                                        if (theme.palette.mode === 'light') {
                                            return selectedItemIndex === index
                                                ? 'primary.light'
                                                : '';
                                        }
                                        return selectedItemIndex === index
                                            ? 'primary.light'
                                            : '';
                                    },
                                    background: (theme) => {
                                        if (theme.palette.mode === 'light') {
                                            return selectedItemIndex === index
                                                ? 'none'
                                                : '';
                                        }
                                        return selectedItemIndex === index
                                            ? 'none'
                                            : '';
                                    },
                                    backgroundColor:
                                        selectedItemIndex === index
                                            ? 'primary.main'
                                            : '',
                                    '& .MuiChip-label': {
                                        color:
                                            selectedItemIndex === index
                                                ? '#fff'
                                                : '',
                                    },
                                }}
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
                        sx={{
                            width: '100%',
                            display: { xs: 'none', sm: 'flex' },
                        }}
                    >
                        {items.map(
                            ({ icon, title, description, link }, index) => (
                                <Card
                                    key={index}
                                    component={Button}
                                    onClick={() => handleItemClick(index)}
                                    sx={{
                                        p: 2,
                                        height: 'fit-content',
                                        width: '100%',
                                        background: 'none',
                                        backgroundColor:
                                            selectedItemIndex === index
                                                ? 'action.selected'
                                                : undefined,
                                        borderColor: (theme) => {
                                            if (
                                                theme.palette.mode === 'light'
                                            ) {
                                                return selectedItemIndex ===
                                                    index
                                                    ? 'primary.light'
                                                    : 'grey.200';
                                            }
                                            return selectedItemIndex === index
                                                ? 'primary.dark'
                                                : 'grey.800';
                                        },
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width: '100%',
                                            display: 'flex',
                                            textAlign: 'left',
                                            flexDirection: {
                                                xs: 'column',
                                                md: 'row',
                                            },
                                            alignItems: { md: 'center' },
                                            gap: 2.5,
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                color: (theme) => {
                                                    if (
                                                        theme.palette.mode ===
                                                        'light'
                                                    ) {
                                                        return selectedItemIndex ===
                                                            index
                                                            ? 'primary.main'
                                                            : 'grey.300';
                                                    }
                                                    return selectedItemIndex ===
                                                        index
                                                        ? 'primary.main'
                                                        : 'grey.700';
                                                },
                                            }}
                                        >
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
                                                sx={{ my: 0.5 }}
                                            >
                                                {description}
                                            </Typography>
                                            {link ? (
                                                <Link
                                                    color="primary"
                                                    variant="body2"
                                                    fontWeight="bold"
                                                    href={link}
                                                    sx={{
                                                        display: 'inline-flex',
                                                        alignItems: 'center',
                                                        '& > svg': {
                                                            transition: '0.2s',
                                                        },
                                                        '&:hover > svg': {
                                                            transform:
                                                                'translateX(2px)',
                                                        },
                                                    }}
                                                >
                                                    <span>See more</span>
                                                    <ChevronRightRoundedIcon
                                                        fontSize="small"
                                                        sx={{
                                                            mt: '1px',
                                                            ml: '2px',
                                                        }}
                                                    />
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
                    sx={{ display: { xs: 'none', sm: 'flex' }, width: '100%' }}
                >
                    <Card
                        sx={{
                            height: '100%',
                            width: '100%',
                            display: { xs: 'none', sm: 'flex' },
                            pointerEvents: 'none',
                            backgroundColor: 'white',
                            justifyContent: 'center',
                        }}
                    >
                        {items[selectedItemIndex].content}
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
};

export default FeaturedContent;
