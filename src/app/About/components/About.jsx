import React from 'react';
import me from '../pictures/coach_pj.jpg';
import '../styles/aboutStyles.css';
import '../../common/styles/globalStyles.css';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import PageHero from '../../common/Header/PageHero';
import InfoIcon from '@mui/icons-material/Info';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import StorageIcon from '@mui/icons-material/Storage';
import SecurityIcon from '@mui/icons-material/Security';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import DataUsageIcon from '@mui/icons-material/DataUsage';

const About = () => {
    const sections = [
        {
            icon: <InfoIcon />,
            header: 'Statistics and Data For Towson High Wrestling',
            description:
                'This purpose of this site is to have a central hub that wrestlers and coaches can access to look up statistics and data for Towson High School Wrestling. This data is both individualized and team oriented, allowing student athletes to analyze their performance and how it has contributed to team success. In addition, student athletes will have access to both post-season and regular season data and will be able to see career statistics starting from the 2021-2022 season.',
        },
        {
            icon: <DataUsageIcon />,
            header: 'What Data is Available on this Website?',
            description:
                'Student athletes will have access to both post-season and regular season data and will be able to see career statistics starting from the 2021-2022 season. However, due to the way scoring is conducted throughout the season, post-season statistics are more limited than regular season data which tracks all scoring actions. All wins, losses, match times, methods of result, period the match ended in, and in some cases, points for/against, are common data points that are available for both regular season and post-season matches. Regular season individual tournament match data will be collected and scored similar to how post-season matches are, with fewer data points, but still contributing to career numbers.',
        },
        {
            icon: <StorageIcon />,
            header: 'How is the Data Obtained?',
            description:
                'All data is obtained by manual scoring throughout the wrestling season by Towson High School student managers or Coach PJ. Individual and post-season data is scored by official tournament scorers and have been collected from TrackWrestling, which most tournaments use as an open platform to score and track matches for several individualized tournaments.',
        },
        {
            icon: <SecurityIcon />,
            header: 'Who Has Access to the Website?',
            description:
                'Only verified people with a login to this website will be granted access to browse the site past the home login page. All data will be protected to the best of my ability and login username/passwords will only be distributed to those affiliated with Towson High School Wrestling. If there are any concerns of security, do not hesistate to reach out',
        },
        {
            icon: <LightbulbIcon />,
            header: 'Got Ideas, Improvements, or Recommendations?',
            description:
                'Any and all feedback about the website, its features, or functionality are greatly appreciated! Contact me, Coach PJ, with ideas, improvements, or recommendations for the site and I will do my best to see if we can get it added!',
        },
    ];

    return (
        <Box className="modern-page">
            <PageHero 
                title="About / FAQ" 
                subtitle="Learn more about the Towson Wrestling Database and how it works"
            />
            
            <Container maxWidth="lg" className="page-content">
                <Grid container spacing={4}>
                    {/* FAQ Sections */}
                    <Grid item xs={12} md={8}>
                        <Box className="about-sections">
                            {sections.map((section, index) => (
                                <Paper key={index} className="info-card" elevation={0}>
                                    <Box className="about-section-header">
                                        <Box className="about-section-icon">
                                            {section.icon}
                                        </Box>
                                        <Typography className="info-card-title">
                                            {section.header}
                                        </Typography>
                                    </Box>
                                    <Typography className="info-card-description">
                                        {section.description}
                                    </Typography>
                                </Paper>
                            ))}
                        </Box>
                    </Grid>
                    
                    {/* Coach Profile */}
                    <Grid item xs={12} md={4}>
                        <Paper className="about-profile-card" elevation={0}>
                            <img 
                                src={me} 
                                alt="Coach PJ" 
                                className="about-profile-image"
                            />
                            <Box className="about-profile-content">
                                <Typography className="about-profile-name">
                                    PJ Lenhart
                                </Typography>
                                <Typography className="about-profile-role">
                                    Head Coach & Website Creator
                                </Typography>
                                <Typography className="about-profile-school">
                                    Towson High School Wrestling
                                </Typography>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default About;
