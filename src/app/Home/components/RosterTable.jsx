import React from 'react';
import { Link } from 'react-router-dom';
import MaterialTable from '../../common/Table/MaterialTable';

// showStatus defaults on so an unfiltered listing still says who is who; a
// caller that has already split the roster passes false, since inside one of
// those lists the column is the same value on every row.
const RosterTable = ({ data, showStatus = true }) => {
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
        ...(showStatus
            ? [
                  {
                      path: 'active_roster',
                      label: 'Status',
                      content: (wrestler) => (
                          <span style={{ 
                              color: wrestler.active_roster === 1 ? 'var(--color-positive)' : 'var(--color-gray-600)',
                              fontWeight: wrestler.active_roster === 1 ? 600 : 400,
                          }}>
                              {wrestler.active_roster === 1 ? 'Active' : 'Alumni'}
                          </span>
                      ),
                  },
              ]
            : []),
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
