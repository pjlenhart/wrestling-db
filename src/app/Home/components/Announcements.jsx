import React from 'react';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

const Announcements = (props) => {
    const { announcements } = props;
    return (
        <Paper
            sx={{
                width: 500,
                p: 5,
                alignContent: 'center',
            }}
        >
            {announcements.length > 0 ? (
                announcements.map((ann) => (
                    <Box>
                        <Typography
                            component="h2"
                            variant="h5"
                            sx={{
                                fontFamily: 'Baloo',
                            }}
                        >
                            {ann.header}
                        </Typography>
                        <Typography component="ul">
                            <Typography
                                component="li"
                                sx={{
                                    fontFamily: 'Baloo',
                                }}
                            >
                                {ann.detail}
                            </Typography>
                        </Typography>
                    </Box>
                ))
            ) : (
                <Typography variant="subtitle1" paragraph>
                    No announcements at this time. Check back later for more!
                </Typography>
            )}
        </Paper>
    );
};

export default Announcements;
