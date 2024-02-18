import React from 'react';
import Box from '@mui/material/Box';
import '../styles/aboutStyles.css';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

const AboutFAQSection = (props) => {
    const { sectionHeader, description } = props;

    return (
        <Box
            sx={{
                py: 1,
            }}
        >
            <Typography
                component="h4"
                variant="h4"
                sx={{
                    fontFamily: 'Baloo',
                    pb: 1,
                }}
            >
                {sectionHeader}
            </Typography>
            <Divider
                sx={{
                    bgcolor: '#800000',
                }}
            />
            <Typography
                variant="paragraph"
                color="black"
                sx={{
                    fontFamily: 'Baloo',
                    fontWeight: 700,
                }}
            >
                {description}
            </Typography>
        </Box>
    );
};

export default AboutFAQSection;
