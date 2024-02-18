import React from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';

const Subheader = (props) => {
    const {
        label,
        paddingLeft,
        paddingRight,
        paddingBottom,
        paddingTop,
        width,
    } = props;
    return (
        <Box
            sx={{
                pl: paddingLeft,
                pr: paddingRight,
                pb: paddingBottom,
                pt: paddingTop,
            }}
        >
            <Chip
                label={label}
                size="large"
                sx={{
                    fontFamily: 'Baloo',
                    bgcolor: 'black',
                    color: 'white',
                    width: width,
                    fontSize: 18,
                }}
            />
        </Box>
    );
};

export default Subheader;
