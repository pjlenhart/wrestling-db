import React from 'react';
import MaterialTable from '../../common/Table/MaterialTable';
import {
    ArrowCircleUp,
    ArrowCircleDown,
    RemoveCircleOutline,
} from '@mui/icons-material';
import { Typography, Box } from '@mui/material';

const RecordsTable = (props) => {
    const { records } = props;
    const recordColumns = [
        {
            path: 'wrestler_name',
            label: 'Name',
            content: (wrestler) =>
                wrestler.season === 'Career' ? (
                    <Typography className="record-career-text">
                        {wrestler.wrestler_name}
                    </Typography>
                ) : (
                    wrestler.wrestler_name
                ),
        },
        {
            path: 'season',
            label: 'Season',
            content: (wrestler) =>
                wrestler.season === 'Career' ? (
                    <Typography className="record-career-text">
                        {wrestler.season}
                    </Typography>
                ) : (
                    wrestler.season
                ),
        },
        {
            path: 'wins',
            label: 'Wins',
            content: (wrestler) =>
                wrestler.season === 'Career' ? (
                    <Typography className="record-career-text">
                        {wrestler.wins}
                    </Typography>
                ) : (
                    wrestler.wins
                ),
        },
        {
            path: 'losses',
            label: 'Losses',
            content: (wrestler) =>
                wrestler.season === 'Career' ? (
                    <Typography className="record-career-text">
                        {wrestler.losses}
                    </Typography>
                ) : (
                    wrestler.losses
                ),
        },
        {
            path: 'wins_by_pin',
            label: 'Pins',
            content: (wrestler) =>
                wrestler.season === 'Career' ? (
                    <Typography className="record-career-text">
                        {wrestler.wins_by_pin}
                    </Typography>
                ) : (
                    wrestler.wins_by_pin
                ),
        },
        {
            path: 'team_points_earned',
            label: 'Team Points Earned',
            content: (wrestler) =>
                wrestler.season === 'Career' ? (
                    <Typography className="record-career-text">
                        {wrestler.team_points_earned}
                    </Typography>
                ) : (
                    wrestler.team_points_earned
                ),
        },
        {
            path: 'wins',
            label: 'Form',
            content: (wrestler) => {
                console.log('wrestler', wrestler);
                if (parseInt(wrestler.wins) > parseInt(wrestler.losses))
                    return (
                        <ArrowCircleUp
                            sx={{
                                color: 'green',
                                fontSize: 35,
                            }}
                        />
                    );
                else if (parseInt(wrestler.wins) < parseInt(wrestler.losses))
                    return (
                        <ArrowCircleDown
                            sx={{
                                color: 'red',
                                fontSize: 35,
                            }}
                        />
                    );
                else
                    return (
                        <RemoveCircleOutline
                            sx={{
                                color: 'goldenrod',
                                fontSize: 35,
                            }}
                        />
                    );
            },
        },
    ];
    return (
        <>
            <MaterialTable
                columns={recordColumns}
                data={records}
                unstriped={true}
                sticky={true}
            />
            {console.log('records', records)}
        </>
    );
};

export default RecordsTable;
