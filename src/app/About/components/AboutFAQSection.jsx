import React from 'react';
import Box from '@mui/material/Box';
import '../styles/aboutStyles.css';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

const AboutFAQSection = (props) => {
    const { sectionHeader, description } = props;

    return (
        <Box className="about-faq-section">
            <Typography
                component="h4"
                variant="h4"
                className="about-faq-title"
            >
                {sectionHeader}
            </Typography>
            <Divider className="about-faq-divider" />
            <Typography
                variant="paragraph"
                color="black"
                className="about-faq-description"
            >
                {description}
            </Typography>
        </Box>
    );
};

export default AboutFAQSection;
