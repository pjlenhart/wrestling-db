import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import beast from '../images/beast_otw-big.png';

const MainContent = () => {
    return (
        <Box>
            <Container
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    pb: { xs: 1, sm: 2 },
                }}
            >
                <Stack
                    spacing={1}
                    useFlexGap
                    sx={{ width: { xs: '100%', sm: '70%' } }}
                >
                    <Paper
                        variant="outline"
                        sx={{
                            alignSelf: 'center',
                            pt: 1,
                        }}
                    >
                        <Typography
                            component="h3"
                            variant="h3"
                            color="#800000"
                            sx={{
                                display: 'flex',
                                flexDirection: { xs: 'column', md: 'row' },
                                alignSelf: 'center',
                                textAlign: 'center',
                            }}
                        >
                            Towson Wrestling DB
                        </Typography>
                        <img
                            src={beast}
                            alt="beast of the week"
                            style={{
                                width: 400,
                                height: 350,
                                marginLeft: 35,
                            }}
                        />
                    </Paper>

                    <Typography
                        variant="body1"
                        textAlign="center"
                        color="text.secondary"
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
