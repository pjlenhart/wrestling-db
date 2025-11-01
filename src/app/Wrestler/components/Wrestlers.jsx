import React from 'react';
import RosterTable from '../../Home/components/RosterTable';
import '../styles/wrestlerStyles.css';
import PageHeader from '../../common/Header/PageHeader';
import Box from '@mui/material/Box';
import Subheader from '../../common/Header/Subheader';

const Wrestlers = (props) => {
    const { roster } = props;

    return (
        <>
            <PageHeader header="Wrestler Directory" />
            <Box className="wrestlers-box">
                <Subheader
                    label="All Towson Wrestlers - Click a name to explore their page!"
                    minWidth={800}
                    paddingBottom={3}
                />
                <RosterTable data={roster} sortColumn="wrestler_name" />
            </Box>
        </>
    );
};

export default Wrestlers;
