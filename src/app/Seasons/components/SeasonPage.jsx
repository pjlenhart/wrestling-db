import React, { Component } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Subheader from '../../common/Header/Subheader';
import SeasonTable from './SeasonTable';

const SeasonPage = (props) => {
    const { season, individualData, regularSeasonData } = props;

    const individualDataFiltered =
        season === 'all'
            ? individualData
            : individualData.filter((match) => match.season === season);
    const regularSeasonDataFiltered =
        season === 'all'
            ? regularSeasonData
            : regularSeasonData.filter((match) => match.season === season);

    return (
        <Box
            sx={{
                width: 'auto',
                alignItems: 'center',
                px: 5,
            }}
        >
            <Stack>
                <Subheader
                    label={`Regular Season Matches - ${
                        season === 'all' ? 'All Time' : season
                    }`}
                    paddingBottom={2}
                />
                <SeasonTable
                    data={regularSeasonDataFiltered}
                    type="regularSeason"
                />
                <Subheader
                    label={`Individual/Post-Season Matches - ${
                        season === 'all' ? 'All Time' : season
                    }`}
                    paddingBottom={2}
                    paddingTop={2}
                />
                <SeasonTable data={individualDataFiltered} type="individual" />
            </Stack>
        </Box>
    );
};

export default SeasonPage;
