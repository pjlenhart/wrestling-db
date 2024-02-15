import React from 'react';
import MaterialTable from '../../common/Table/MaterialTable';

const SchoolRegionTable = (props) => {
    const { header, data } = props;
    const columns = [
        { path: 'school_name', label: header },
        { path: 'county', label: '' },
    ];

    return (
        <>
            <MaterialTable
                data={data}
                columns={columns}
                headerHex="#C0C0C0"
                headerFontColor="black"
                unstriped
                alignCell="left"
                alignHeaderCells="left"
                minWidth={400}
            />
        </>
    );
};

export default SchoolRegionTable;
