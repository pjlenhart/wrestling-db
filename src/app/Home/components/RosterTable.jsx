import React, { useState, useEffect } from 'react';
import { getWrestlers, getWrestlerById } from '../../services/rosterService';
import { Link } from 'react-router-dom';
import Table from '../../common/Table/Table';
import MaterialTable from '../../common/Table/MaterialTable';

const RosterTable = (props) => {
    const { data, sortColumn } = props;
    const wrestlerColumns = [
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
    ];
    return <MaterialTable columns={wrestlerColumns} data={data} />;
};

export default RosterTable;
