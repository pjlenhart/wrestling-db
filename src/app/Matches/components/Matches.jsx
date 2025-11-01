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
            <Box className="matches-page-container">
                {orderSeasons.map((season) => {
                    return (
                        <>
                            <Subheader label={`Season ${season}`} />
                            <Box className="matches-season-box">
                                <Box className="matches-table-box">
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
