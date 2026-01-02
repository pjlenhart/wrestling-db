import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import '../styles/globalStyles.css';

const PageHero = ({ title, subtitle, icon }) => {
    return (
        <Box className="page-hero">
            <Box className="page-hero-content">
                <Typography variant="h2" component="h1" className="page-hero-title">
                    {icon && <span style={{ marginRight: '0.5rem' }}>{icon}</span>}
                    {title}
                </Typography>
                {subtitle && (
                    <Typography variant="body1" className="page-hero-subtitle">
                        {subtitle}
                    </Typography>
                )}
            </Box>
        </Box>
    );
};

export default PageHero;

