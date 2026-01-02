import React from 'react';
import MaterialTable from '../../common/Table/MaterialTable';
import {
    ArrowCircleUp,
    ArrowCircleDown,
    RemoveCircleOutline,
} from '@mui/icons-material';
import { Typography } from '@mui/material';
import '../styles/recordStyles.css';

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
            label: 'W',
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
            label: 'L',
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
            label: 'Team Pts',
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
                const wins = parseInt(wrestler.wins);
                const losses = parseInt(wrestler.losses);

                if (wins > losses) {
                    return (
                        <ArrowCircleUp
                            sx={{
                                color: '#2E7D32',
                                fontSize: 28,
                            }}
                        />
                    );
                } else if (wins < losses) {
                    return (
                        <ArrowCircleDown
                            sx={{
                                color: '#C62828',
                                fontSize: 28,
                            }}
                        />
                    );
                } else {
                    return (
                        <RemoveCircleOutline
                            sx={{
                                color: '#F9A825',
                                fontSize: 28,
                            }}
                        />
                    );
                }
            },
        },
    ];

    return (
        <MaterialTable
            columns={recordColumns}
            data={records}
            unstriped={false}
            sticky={true}
            minWidth={600}
        />
    );
};

export default RecordsTable;
