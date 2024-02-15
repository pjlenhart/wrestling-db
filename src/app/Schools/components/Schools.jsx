import React from 'react';
import SchoolPageView from './SchoolPageView';
import '../styles/schoolStyles.css';
import PageHeader from '../../common/Header/PageHeader';
import Subheader from '../../common/Header/Subheader';
import Box from '@mui/material/Box';

const Schools = (props) => {
    const { schools, regions } = props;

    return (
        <>
            <PageHeader header="School Directory" />
            <Box
                sx={{
                    width: 'auto',
                    alignItems: 'center',
                    px: 5,
                }}
            >
                <Subheader
                    label={`Current MPSSAA Regions and Divisions`}
                    width={500}
                    paddingBottom={2}
                />
                <SchoolPageView schools={schools} />
            </Box>
        </>
    );
};

export default Schools;
