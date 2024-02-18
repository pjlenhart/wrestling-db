import React from 'react';
import { Link } from 'react-router-dom';
import MaterialTable from '../../common/Table/MaterialTable';

const RosterTable = (props) => {
    const { data } = props;
    const wrestlerColumns = [
        {
            path: 'wrestler_id',
            label: 'Wrestler ID',
        },
        {
            path: 'wrestler_name',
            label: 'Name',
            content: (wrestler) => (
                <Link
                    to={`/wrestlers/${wrestler.wrestler_id}`}
                    style={{ color: 'maroon' }}
                >
                    {wrestler.wrestler_name}
                </Link>
            ),
        },
        { path: 'classOf', label: 'Class' },
        {
            path: 'active_roster',
            label: 'Active Roster',
            content: (wrestler) =>
                wrestler.active_roster === 1 ? 'On Active Roster' : 'Alumni',
        },
    ];
    return <MaterialTable columns={wrestlerColumns} data={data} />;
};

export default RosterTable;
