import React from 'react';
import Grid from '@mui/material/Grid';
import SchoolRegionTable from './SchoolRegionTable';
import { Divider } from '@mui/material';

const SchoolPageView = (props) => {
    const { schools } = props;
    return (
        <Grid>
            <Grid container spacing={1}>
                <Grid item xs={6} md={3}>
                    <SchoolRegionTable
                        data={schools.filter(
                            (school) => school.region === '4A North'
                        )}
                        header={'4A North'}
                    />
                </Grid>
                <Grid item xs={6} md={3}>
                    <SchoolRegionTable
                        data={schools.filter(
                            (school) => school.region === '4A East'
                        )}
                        header={'4A East'}
                    />
                </Grid>
                <Grid item xs={6} md={3}>
                    <SchoolRegionTable
                        data={schools.filter(
                            (school) => school.region === '4A West'
                        )}
                        header={'4A West'}
                    />
                </Grid>
                <Grid item xs={6} md={3}>
                    <SchoolRegionTable
                        data={schools.filter(
                            (school) => school.region === '4A South'
                        )}
                        header={'4A South'}
                    />
                </Grid>
            </Grid>
            <Divider
                sx={{
                    py: 3,
                }}
            />
            <Grid container spacing={1}>
                <Grid item xs={6} md={3}>
                    <SchoolRegionTable
                        data={schools.filter(
                            (school) => school.region === '3A North'
                        )}
                        header={'3A North'}
                    />
                </Grid>
                <Grid itemxs={6} md={3}>
                    <SchoolRegionTable
                        data={schools.filter(
                            (school) => school.region === '3A East'
                        )}
                        header={'3A East'}
                    />
                </Grid>
                <Grid item xs={6} md={3}>
                    <SchoolRegionTable
                        data={schools.filter(
                            (school) => school.region === '3A West'
                        )}
                        header={'3A West'}
                    />
                </Grid>
                <Grid itemxs={6} md={3}>
                    <SchoolRegionTable
                        data={schools.filter(
                            (school) => school.region === '3A South'
                        )}
                        header={'3A South'}
                    />
                </Grid>
            </Grid>
            <Divider
                sx={{
                    py: 3,
                }}
            />
            <Grid container spacing={1}>
                <Grid item xs={6} md={3}>
                    <SchoolRegionTable
                        data={schools.filter(
                            (school) => school.region === '2A North'
                        )}
                        header={'2A North'}
                    />
                </Grid>
                <Grid item xs={6} md={3}>
                    <SchoolRegionTable
                        data={schools.filter(
                            (school) => school.region === '2A East'
                        )}
                        header={'2A East'}
                    />
                </Grid>
                <Grid item xs={6} md={3}>
                    <SchoolRegionTable
                        data={schools.filter(
                            (school) => school.region === '2A West'
                        )}
                        header={'2A West'}
                    />
                </Grid>
                <Grid item xs={6} md={3}>
                    <SchoolRegionTable
                        data={schools.filter(
                            (school) => school.region === '2A South'
                        )}
                        header={'2A South'}
                    />
                </Grid>
            </Grid>
            <Divider
                sx={{
                    py: 3,
                }}
            />
            <Grid container spacing={1}>
                <Grid item xs={6} md={3}>
                    <SchoolRegionTable
                        data={schools.filter(
                            (school) => school.region === '1A North'
                        )}
                        header={'1A North'}
                    />
                </Grid>
                <Grid item xs={6} md={3}>
                    <SchoolRegionTable
                        data={schools.filter(
                            (school) => school.region === '1A East'
                        )}
                        header={'1A East'}
                    />
                </Grid>
                <Grid item xs={6} md={3}>
                    <SchoolRegionTable
                        data={schools.filter(
                            (school) => school.region === '1A West'
                        )}
                        header={'1A West'}
                    />
                </Grid>
                <Grid item xs={6} md={3}>
                    <SchoolRegionTable
                        data={schools.filter(
                            (school) => school.region === '1A South'
                        )}
                        header={'1A South'}
                    />
                </Grid>
            </Grid>
            <Divider
                sx={{
                    py: 3,
                }}
            />
        </Grid>
    );
};

export default SchoolPageView;
