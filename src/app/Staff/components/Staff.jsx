import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import PageHero from '../../common/Header/PageHero';
import pj from '../images/coach_pj.jpg';
import phil from '../images/phil.jpg';
import pete from '../images/pete (2).jpg';
import '../styles/staffStyles.css';
import '../../common/styles/globalStyles.css';

const Staff = () => {
    const staffInfo = [
        {
            img: pj,
            name: 'PJ Lenhart',
            role: 'Head Coach',
            bio: 'Coach PJ has been head coach since 2020 after previously being an assistant coach from 2017-2020, all at Towson High. In High School, Coach PJ wrestled for Towson High for 2 years in the 182 and 195 pound weight class. Last year, the varsity team produced four state qualifiers and one state placer, our first in 9 years. Coach PJ currently is a Software Engineer specializing in web development which allowed him the skills and opportunity to create this website for the program.',
        },
        {
            img: phil,
            name: 'Phil Simmonds',
            role: 'Head JV Coach',
            bio: 'Coach Simmonds has been head JV coach since 2020 after serving as Varsity Head Coach of Towson High from 2000-2020. Coach Simmonds has an incredible amount of wrestling knowledge having been around the sport for most of his life. During his time at Towson, Coach Simmonds has produced 2 state champions and several other medalists at various levels. Coach Simmonds is an alumni of Baltimore Polytechnic High School and a Baltimore native. He is also a Marine Corps veteran.',
        },
        {
            img: pete,
            name: 'Pete Zaleski',
            role: 'Varsity Assistant Coach',
            bio: "Coach Pete has been varsity assistant coach for 1 year. Coach Pete wrestled all 4 years of his high school career at Towson High under Coach Simmonds and brings wrestling knowledge that helped him wrestle at a high level, including several regional championship tournament matches. With this, Coach Pete helped our varsity team send four wrestlers to the state championships with one placing 5th. After high school, Coach Pete attended Shippensburg University where he obtained his Bachelor's degree in Exercise Science. This has helped take the program's conditioning and training to the next level.",
        },
    ];

    return (
        <Box className="modern-page">
            <PageHero 
                title="Coaching Staff" 
                subtitle="Meet the dedicated coaches of Towson Wrestling"
            />
            
            <Container maxWidth="lg" className="page-content">
                <Grid container spacing={3}>
                    {staffInfo.map((staff, index) => (
                        <Grid item xs={12} md={4} key={index}>
                            <Paper className="staff-card" elevation={0}>
                                <Box className="staff-image-container">
                                    <img 
                                        src={staff.img} 
                                        alt={staff.name}
                                        className="staff-image"
                                    />
                                </Box>
                                <Box className="staff-content">
                                    <Typography className="staff-name">
                                        {staff.name}
                                    </Typography>
                                    <Typography className="staff-role">
                                        {staff.role}
                                    </Typography>
                                    <Typography className="staff-bio">
                                        {staff.bio}
                                    </Typography>
                                </Box>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default Staff;
