import React from 'react';
import { Link } from 'react-router-dom';
import MaterialTable from '../../common/Table/MaterialTable';

const RosterTable = (props) => {
    const { data } = props;
    
    const wrestlerColumns = [
        {
            path: 'wrestler_id',
            label: 'ID',
        },
        {
            path: 'wrestler_name',
            label: 'Name',
            content: (wrestler) => (
                <Link
                    to={`/wrestlers/${wrestler.wrestler_id}`}
                    style={{ 
                        color: '#800000', 
                        fontWeight: 600,
                        textDecoration: 'none',
                    }}
                >
                    {wrestler.wrestler_name}
                </Link>
            ),
        },
        { 
            path: 'classOf', 
            label: 'Class' 
        },
        {
            path: 'active_roster',
            label: 'Status',
            content: (wrestler) => (
                <span style={{ 
                    color: wrestler.active_roster === 1 ? '#2E7D32' : '#757575',
                    fontWeight: wrestler.active_roster === 1 ? 600 : 400,
                }}>
                    {wrestler.active_roster === 1 ? 'Active' : 'Alumni'}
                </span>
            ),
        },
    ];
    
    return (
        <MaterialTable 
            columns={wrestlerColumns} 
            data={data} 
            minWidth={400}
        />
    );
};

export default RosterTable;
