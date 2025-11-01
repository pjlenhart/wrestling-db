import React from 'react';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

const Announcements = (props) => {
    const { announcements } = props;
    return (
        <Paper className="announcements-paper">
            {announcements.length > 0 ? (
                announcements.map((ann, idx) => (
                    <Box key={idx}>
                        <Typography
                            component="h2"
                            variant="h5"
                            className="announcements-header"
                        >
                            {ann.header}
                        </Typography>
                        <Typography component="ul">
                            <Typography
                                component="li"
                                className="announcements-list"
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
