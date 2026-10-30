import React from 'react';
import { Link } from 'react-router-dom';
import MaterialTable from '../../common/Table/MaterialTable';
import '../styles/recordStyles.css';

const plural = (n, word) => `${n} ${word}${n === 1 ? '' : 's'}`;

// The same columns serve a wrestler's career row and the season rows it
// opens: a career row names the wrestler, a season row names the season.
const isCareer = (row) => row.season === 'Career';

const number = (path) => (row) => (
    <span className={isCareer(row) ? 'record-career-text' : undefined}>{row[path]}</span>
);

/**
 * One row per wrestler with their career record; opening it lists the record
 * season by season, the most recent first.
 */
const RecordsTable = (props) => {
    const { wrestlers, expandAll } = props;

    const recordColumns = [
        {
            path: 'wrestler_name',
            label: 'Name',
            width: '40%',
            align: 'left',
            content: (row) =>
                isCareer(row) ? (
                    <>
                        <Link
                            to={`/wrestlers/${row.wrestler_id}`}
                            className="record-wrestler-link record-career-link"
                        >
                            <span className="record-career-text">{row.wrestler_name}</span>
                        </Link>
                        <span className="record-season-count">{plural(row.seasons.length, 'season')}</span>
                    </>
                ) : (
                    <span className="record-season-label">{row.season}</span>
                ),
        },
        { path: 'wins', label: 'W', width: '12%', content: number('wins') },
        { path: 'losses', label: 'L', width: '12%', content: number('losses') },
        { path: 'wins_by_pin', label: 'Pins', width: '14%', content: number('wins_by_pin') },
        { path: 'team_points_earned', label: 'Team Pts', width: '22%', content: number('team_points_earned') },
    ];

    return (
        <MaterialTable
            columns={recordColumns}
            data={wrestlers}
            unstriped={false}
            minWidth={0}
            getRowKey={(row) => row.wrestler_id}
            getSubRows={(row) => row.seasons}
            expandAll={expandAll}
            expandLabel={(row) => `${row.wrestler_name}'s record by season`}
        />
    );
};

export default RecordsTable;
