import React from 'react';
import MaterialTable from '../../common/Table/MaterialTable';
import Box from '@mui/material/Box';

const SchoolRegionTable = (props) => {
    const { header, data } = props;
    const columns = [
        { path: 'school_name', label: header },
        { path: 'county', label: '' },
    ];

    return (
        <Box className="school-region-box">
            <MaterialTable
                data={data}
                columns={columns}
                headerHex="#C0C0C0"
                headerFontColor="black"
                unstriped
                alignCell="left"
                alignHeaderCells="left"
                minWidth={390}
            />
        </Box>
    );
};

export default SchoolRegionTable;
