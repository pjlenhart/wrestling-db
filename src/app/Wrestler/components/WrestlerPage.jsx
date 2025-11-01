import React from 'react';
import WrestlerPageTable from './WrestlerPageTable';
import WrestlerStatBox from './WrestlerStatBox';
import Accolades from './Accolades';
import '../styles/wrestlerStyles.css';
import RadarChart from './RadarCharts';
import PageHeader from '../../common/Header/PageHeader';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Subheader from '../../common/Header/Subheader';
import Typography from '@mui/material/Typography';

const WrestlerPage = (props) => {
    const {
        regularSeasonData,
        individualData,
        wrestlerData,
        careerStats,
        accolades,
    } = props;
    const wrestlerName = wrestlerData ? wrestlerData.wrestler_name : null;
    const careerArr = careerStats.filter((stats) => stats.season === 'Career');
    const seasons = [...new Set(careerStats.map((stat) => stat.season))];
    const seasonList = seasons
        .filter((season) => season !== 'Career')
        .reverse();
    const career = careerArr[0] ? careerArr[0] : null;

    return regularSeasonData ? (
        <>
            <PageHeader header={wrestlerName} />

            <Box className="wrestler-page-container">
                <Accolades accolades={accolades} />
                <Grid container spacing={3}>
                    <Grid item xs={12} md={8}>
                        <Stack>
                            <Subheader
                                label="Regular Season - Career"
                                paddingTop={2}
                                paddingBottom={2}
                            />
                            <WrestlerPageTable
                                data={regularSeasonData}
                                type="regularSeason"
                            />
                            <br />
                            <br />
                            <Subheader
                                label="Individual/Postseason - Career"
                                paddingTop={2}
                                paddingBottom={2}
                            />
                            <WrestlerPageTable
                                data={individualData}
                                type="individual"
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Subheader
                            label="Wrestler Statistics"
                            paddingTop={2}
                            paddingBottom={2}
                        />
                        <Typography
                            variant="body1"
                            color="text.secondary"
                            fontFamily="Baloo"
                        >
                            *Note: some statistics are only counted in the
                            regular season, wins/losses, match times, and
                            periods are counted in regular and post season.
                        </Typography>
                        <WrestlerStatBox data={career} />
                    </Grid>
                </Grid>

                <Box>
                    <Subheader
                        label="Scoring Actions Breakdown Compared to Opponents, by Season"
                        paddingTop={5}
                        paddingBottom={3}
                    />
                    <Grid container>
                        {seasonList.map((season) => {
                            return (
                                <Grid item xs={12} md={6}>
                                    <Typography
                                        component="h5"
                                        variant="h5"
                                        color="text.secondary"
                                        fontFamily="Baloo"
                                    >
                                        Season {season}
                                    </Typography>
                                    <RadarChart
                                        chartData={careerStats.filter(
                                            (sea) => sea.season === season
                                        )}
                                    />
                                </Grid>
                            );
                        })}
                    </Grid>
                </Box>
            </Box>
        </>
    ) : null;
};

export default WrestlerPage;
