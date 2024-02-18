import React from 'react';
import { Divider, Typography } from '@mui/material';

const PageHeader = (props) => {
    const { header } = props;
    return (
        <Divider
            textAlign="left"
            fullWidth={true}
            sx={{
                pb: 5,
                '&::before, &::after': {
                    borderColor: 'black',
                    border: 2,
                },
            }}
        >
            <Typography
                component="h3"
                variant="h3"
                color="#800000"
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    alignSelf: 'center',
                    textAlign: 'center',
                    fontFamily: 'Baloo',
                }}
            >
                {header}
            </Typography>
        </Divider>
    );
};

export default PageHeader;
