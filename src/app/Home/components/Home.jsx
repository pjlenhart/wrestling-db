import React from 'react';
import Announcements from './Announcements';
import MatchTable from '../../Matches/components/MatchTable';
import SeasonCountdown from './SeasonCountdown';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import '../styles/homeStyles.css';
import MainContent from './MainContent';
import SportsKabaddi from '@mui/icons-material/SportsKabaddi';
import Instagram from '@mui/icons-material/Instagram';
import Campaign from '@mui/icons-material/Campaign';
import FeaturedContent from './FeaturedContent';
import ig from '../images/ig_logo.svg';
import Typography from '@mui/material/Typography';

const Home = (props) => {
    const { teamMatchData, announcements } = props;

    const featureContent = [
        {
            title: 'Recent Matches',
            description: 'Our most recent matches wrestled as a team.',
            content: <MatchTable data={teamMatchData} />,
            link: '/matches',
            icon: <SportsKabaddi />,
        },
        {
            title: 'Announcements',
            description:
                'Latest announcements of team events, matches, and information',
            content: <Announcements announcements={announcements} />,
            link: null,
            icon: <Campaign />,
        },
        {
            title: 'Follow us on Instagram!',
            description: <span>@towson_high_wrestling</span>,
            content: (
                <img
                    src={ig}
                    alt="ths wrestling instagram"
                    style={{ height: 450, width: 450 }}
                />
            ),
            link: 'https://www.instagram.com/towson_high_wrestling/',
            icon: <Instagram />,
            alt: 'instagram',
        },
    ];
    return (
        <Container disableGutters={true}>
            <MainContent />
            <FeaturedContent featureItems={featureContent} />
            <Box>
                <Typography component="h2" variant="h4" color="text.primary">
                    Season Countdown
                </Typography>
                <SeasonCountdown />
            </Box>
        </Container>
    );
};

export default Home;
