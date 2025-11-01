import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import beast from '../images/beast_otw-big.png';
import '../../Home/styles/homeStyles.css';

const MainContent = () => {
    return (
        <Box>
            <Container className="main-content-wrapper">
                <Stack spacing={1} useFlexGap className="main-content-stack">
                    <Paper variant="outline" className="main-content-paper">
                        <Typography
                            component="h3"
                            variant="h3"
                            className="main-content-title"
                        >
                            Towson Wrestling DB
                        </Typography>
                        <img
                            src={beast}
                            alt="beast of the week"
                            className="beast-image"
                        />
                    </Paper>

                    <Typography
                        variant="body1"
                        className="main-content-description"
                    >
                        Explore the years of Towson Wrestling. Gain data driven
                        insights down to the match level.
                    </Typography>
                </Stack>
            </Container>
        </Box>
    );
};

export default MainContent;
