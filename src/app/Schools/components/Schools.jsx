import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import PageHero from '../../common/Header/PageHero';
import SchoolRegionTable from './SchoolRegionTable';
import '../styles/schoolStyles.css';
import '../../common/styles/globalStyles.css';
import SchoolIcon from '@mui/icons-material/School';

const Schools = (props) => {
    const { schools } = props;

    const regions = [
        { name: '4A North', division: '4A' },
        { name: '4A East', division: '4A' },
        { name: '4A West', division: '4A' },
        { name: '4A South', division: '4A' },
        { name: '3A North', division: '3A' },
        { name: '3A East', division: '3A' },
        { name: '3A West', division: '3A' },
        { name: '3A South', division: '3A' },
        { name: '2A North', division: '2A' },
        { name: '2A East', division: '2A' },
        { name: '2A West', division: '2A' },
        { name: '2A South', division: '2A' },
        { name: '1A North', division: '1A' },
        { name: '1A East', division: '1A' },
        { name: '1A West', division: '1A' },
        { name: '1A South', division: '1A' },
    ];

    const getDivisionColor = (division) => {
        switch (division) {
            case '4A': return '#800000';
            case '3A': return '#1565C0';
            case '2A': return '#2E7D32';
            case '1A': return '#7B1FA2';
            default: return '#800000';
        }
    };

    return (
        <Box className="modern-page">
            <PageHero 
                title="School Directory" 
                subtitle="Current MPSSAA regions and divisions for Maryland wrestling"
            />
            
            <Container maxWidth="lg" className="page-content">
                {/* 4A Division */}
                <Box className="schools-division-section">
                    <Typography className="schools-division-title" style={{ color: getDivisionColor('4A') }}>
                        4A Division
                    </Typography>
                    <Grid container spacing={2}>
                        {regions.filter(r => r.division === '4A').map((region, index) => (
                            <Grid item xs={12} sm={6} md={3} key={region.name}>
                                <SchoolRegionTable
                                    data={schools.filter(school => school.region === region.name)}
                                    header={region.name}
                                    color={getDivisionColor(region.division)}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                {/* 3A Division */}
                <Box className="schools-division-section">
                    <Typography className="schools-division-title" style={{ color: getDivisionColor('3A') }}>
                        3A Division
                    </Typography>
                    <Grid container spacing={2}>
                        {regions.filter(r => r.division === '3A').map((region, index) => (
                            <Grid item xs={12} sm={6} md={3} key={region.name}>
                                <SchoolRegionTable
                                    data={schools.filter(school => school.region === region.name)}
                                    header={region.name}
                                    color={getDivisionColor(region.division)}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                {/* 2A Division */}
                <Box className="schools-division-section">
                    <Typography className="schools-division-title" style={{ color: getDivisionColor('2A') }}>
                        2A Division
                    </Typography>
                    <Grid container spacing={2}>
                        {regions.filter(r => r.division === '2A').map((region, index) => (
                            <Grid item xs={12} sm={6} md={3} key={region.name}>
                                <SchoolRegionTable
                                    data={schools.filter(school => school.region === region.name)}
                                    header={region.name}
                                    color={getDivisionColor(region.division)}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                {/* 1A Division */}
                <Box className="schools-division-section">
                    <Typography className="schools-division-title" style={{ color: getDivisionColor('1A') }}>
                        1A Division
                    </Typography>
                    <Grid container spacing={2}>
                        {regions.filter(r => r.division === '1A').map((region, index) => (
                            <Grid item xs={12} sm={6} md={3} key={region.name}>
                                <SchoolRegionTable
                                    data={schools.filter(school => school.region === region.name)}
                                    header={region.name}
                                    color={getDivisionColor(region.division)}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Container>
        </Box>
    );
};

export default Schools;
