import React from 'react';
import { Divider, Typography } from '@mui/material';
import './PageHeader.css';

const PageHeader = (props) => {
    const { header } = props;
    return (
        <Divider
            textAlign="left"
            fullWidth={true}
            className="page-header-divider"
        >
            <Typography
                component="h3"
                variant="h3"
                className="page-header-title"
            >
                {header}
            </Typography>
        </Divider>
    );
};

export default PageHeader;
