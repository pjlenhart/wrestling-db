import React from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import './Subheader.css';

const Subheader = (props) => {
    const { label } = props;

    return (
        <Box className="subheader-box">
            <Chip label={label} size="large" className="subheader-chip" />
        </Box>
    );
};

export default Subheader;
