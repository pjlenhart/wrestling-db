import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import MatchTable from './MatchTable';
import '../styles/matchStyles.css';
import PageHeader from './../../common/Header/PageHeader';
import Subheader from '../../common/Header/Subheader';

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
                                <Subheader
                                    label={`Season ${season}`}
                                    width={300}
                                    paddingLeft={2}
                                />
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
