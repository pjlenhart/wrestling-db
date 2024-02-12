import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import MatchTable from './MatchTable';
import '../styles/matchStyles.css';
import PageHeader from './../../common/Header/PageHeader';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import StarIcon from '@mui/icons-material/Star';

const Matches = (props) => {
    const { seasons, teamMatchData } = props;
    const orderSeasons = seasons.reverse();

    return (
        <>
            <PageHeader header="Dual Meet Results" />
            <Box
                sx={{
                    width: 'auto',
                    alignItems: 'center',
                    px: 15,
                }}
            >
                {orderSeasons.map((season) => {
                    return (
                        <>
                            <Box
                                sx={{
                                    pb: 5,
                                }}
                            >
                                <Box
                                    sx={{
                                        pl: 2,
                                    }}
                                >
                                    <Chip
                                        label={`Season ${season}`}
                                        size="large"
                                        sx={{
                                            fontFamily: 'Baloo',
                                            bgcolor: 'black',
                                            color: 'white',
                                            width: 300,
                                            fontSize: 18,
                                        }}
                                    />
                                </Box>
                                {/* <Typography
                                    component="h5"
                                    variant="h5"
                                    color="gray"
                                    sx={{
                                        display: 'flex',
                                        flexDirection: {
                                            xs: 'column',
                                            md: 'row',
                                        },
                                        alignSelf: 'center',
                                        textAlign: 'center',
                                        fontFamily: 'Baloo',
                                        pb: 2,
                                    }}
                                >
                                    Season {season}
                                </Typography> */}
                                <Box
                                    sx={{
                                        width: '100%',
                                        alignItems: 'center',
                                        p: 2,
                                    }}
                                >
                                    <MatchTable
                                        data={teamMatchData.filter(
                                            (match) => match.season === season
                                        )}
                                        sortColumn="match_date"
                                    />
                                </Box>
                            </Box>
                        </>
                    );
                })}
            </Box>
        </>
    );
};

export default Matches;
