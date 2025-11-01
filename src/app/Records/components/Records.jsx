import React from 'react';
import PageHeader from '../../common/Header/PageHeader';
import Box from '@mui/material/Box';
import Subheader from '../../common/Header/Subheader';
import '../styles/recordStyles.css';
import RecordsTable from './RecordsTable';

const Records = (props) => {
    const { records } = props;
    return (
        <>
            <PageHeader header="Records" />
            <Box className="records-page-container">
                <Subheader
                    label={`Records by Wrestler, by Year`}
                    width={300}
                    paddingBottom={2}
                />

                <RecordsTable records={records} />
            </Box>
        </>
    );
};

export default Records;
