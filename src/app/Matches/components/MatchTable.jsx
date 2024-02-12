import React from 'react';
import _ from 'lodash';
import Table from '../../common/Table/Table';
import '../styles/matchStyles.css';
import MaterialTable from '../../common/Table/MaterialTable';

const MatchTable = (props) => {
    const { data, sortColumn } = props;

    const teamMatchColumns = [
        {
            path: 'opponent_school',
            label: 'Opponent',
        },
        {
            path: 'match_date_formatted',
            label: 'Match Date',
        },
        {
            path: 'team_score',
            label: 'Team Score',
        },
        {
            path: 'opponent_score',
            label: 'Opponent Score',
        },
        {
            path: 'team_result',
            label: 'Result',
        },
    ];

    return <MaterialTable columns={teamMatchColumns} data={data} />;
};

export default MatchTable;
