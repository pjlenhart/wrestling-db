import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import '../styles/homeStyles.css';
import TopPinners from './TopPinners';
import beast from '../images/beast_otw-big.png';
// Icons
import SportsKabaddiIcon from '@mui/icons-material/SportsKabaddi';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SearchIcon from '@mui/icons-material/Search';
import GroupsIcon from '@mui/icons-material/Groups';
import SchoolIcon from '@mui/icons-material/School';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import InstagramIcon from '@mui/icons-material/Instagram';

const Home = ({ topPinners, isLoading }) => {
    const quickLinks = [
        {
            title: 'Team Matches',
            description: 'View all team match results and scores',
            icon: <SportsKabaddiIcon />,
            link: '/matches',
            color: '#2E7D32',
        },
        {
            title: 'Seasons',
            description: 'Browse historical season data',
            icon: <CalendarMonthIcon />,
            link: '/seasons',
            color: '#1565C0',
        },
        {
            title: 'Records',
            description: 'Career stats and records by wrestler',
            icon: <EmojiEventsIcon />,
            link: '/records',
            color: '#F9A825',
        },
        {
            title: 'Move Search',
            description: 'Search wrestling techniques and tutorials',
            icon: <SearchIcon />,
            link: '/moveSearch',
            color: '#7B1FA2',
        },
        {
            title: 'Wrestlers',
            description: 'View individual wrestler profiles',
            icon: <GroupsIcon />,
            link: '/wrestlers',
            color: '#00838F',
        },
        {
            title: 'Schools',
            description: 'School directory and information',
            icon: <SchoolIcon />,
            link: '/schools',
            color: '#D84315',
        },
    ];

    return (
        <Box className="home-page">
            {/* Hero Section */}
            <Box className="hero-section">
                <Container maxWidth="lg">
                    <Box className="hero-content">
                        <Box className="hero-text">
                            <Typography
                                variant="h2"
                                component="h1"
                                className="hero-title"
                            >
                                Towson Wrestling
                            </Typography>
                            <Typography
                                variant="h5"
                                component="p"
                                className="hero-subtitle"
                            >
                                Your source for wrestling data, stats, and
                                insights
                            </Typography>
                            <Typography
                                variant="body1"
                                className="hero-description"
                            >
                                Explore years of Towson Wrestling history.
                                Access match results, wrestler profiles, career
                                statistics, and video tutorials all in one
                                place.
                            </Typography>
                        </Box>
                        <Box className="hero-image-container">
                            <img
                                src={beast}
                                alt="Beast of the Week"
                                className="hero-beast-image"
                            />
                        </Box>
                    </Box>
                </Container>
            </Box>

            {/* Main Content */}
            <Container maxWidth="lg" className="home-main-content">
                {/* Top Pinners & Instagram Row */}
                <Grid container spacing={4} className="stats-row">
                    <Grid item xs={12} md={7}>
                        <TopPinners
                            topPinners={topPinners}
                            isLoading={isLoading}
                        />
                    </Grid>
                    <Grid item xs={12} md={5}>
                        <Box className="instagram-section">
                            <Typography
                                variant="h5"
                                className="instagram-title"
                            >
                                <InstagramIcon className="instagram-title-icon" />
                                Follow Us
                            </Typography>
                            <Paper className="instagram-card" elevation={0}>
                                <Link
                                    href="https://www.instagram.com/towson_high_wrestling/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="instagram-link"
                                >
                                    <InstagramIcon className="instagram-logo-icon" />
                                    <Box className="instagram-info">
                                        <Typography
                                            variant="h6"
                                            className="instagram-handle"
                                        >
                                            @towson_high_wrestling
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            className="instagram-cta"
                                        >
                                            Follow for updates, highlights &
                                            more
                                        </Typography>
                                    </Box>
                                </Link>
                            </Paper>
                        </Box>
                    </Grid>
                </Grid>

                {/* Quick Access Section */}
                <Box className="quick-access-section">
                    <Typography variant="h5" className="quick-access-title">
                        Explore the Database
                    </Typography>
                    <Typography
                        variant="body1"
                        className="quick-access-subtitle"
                    >
                        Quick access to all features
                    </Typography>
                    <Grid container spacing={3} className="quick-links-grid">
                        {quickLinks.map((item, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <Link
                                    href={item.link}
                                    className="quick-link-anchor"
                                >
                                    <Paper
                                        className="quick-link-card"
                                        elevation={0}
                                    >
                                        <Box
                                            className="quick-link-icon"
                                            sx={{
                                                backgroundColor: `${item.color}15`,
                                                color: item.color,
                                            }}
                                        >
                                            {item.icon}
                                        </Box>
                                        <Box className="quick-link-content">
                                            <Typography
                                                variant="h6"
                                                className="quick-link-title"
                                            >
                                                {item.title}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                className="quick-link-description"
                                            >
                                                {item.description}
                                            </Typography>
                                        </Box>
                                        <ChevronRightIcon className="quick-link-arrow" />
                                    </Paper>
                                </Link>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Container>
        </Box>
    );
};

export default Home;
