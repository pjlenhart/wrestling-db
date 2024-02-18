import React from 'react';
import all from '../pictures/towsong.jpg';
import guy from '../pictures/guy.png';
import shoes from '../pictures/shoes.png';
import wrestlers from '../pictures/wrestlers.png';
import ImgCard from '../../common/card/components/ImgCard';
import SeasonTitle from './SeasonTitle';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import '../styles/styles.css';
import { Divider } from '@mui/material';

const Seasons = (props) => {
    const images = [guy, shoes, wrestlers];
    return (
        <>
            <SeasonTitle />
            <Box
                sx={{
                    width: 'auto',
                    alignItems: 'center',
                    px: 5,
                    pb: 5,
                }}
            >
                <Grid>
                    <Grid
                        container
                        spacing={3}
                        sx={{
                            pb: 5,
                        }}
                    >
                        <Grid item xs={12} md={6}>
                            <ImgCard
                                img={all}
                                title="All Seasons"
                                subtitle="Data and statistics from all seasons combined on record"
                                buttonText="Explore"
                                cardClasses="season-card"
                                buttonClasses="season-button"
                                link="seasons/all"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <ImgCard
                                img={
                                    images[
                                        Math.floor(
                                            Math.random() * images.length
                                        )
                                    ]
                                }
                                title="2023-2024"
                                subtitle="Data and statistics from the 2023-2024 season"
                                buttonText="Explore"
                                cardClasses="season-card"
                                buttonClasses="season-button"
                                link="seasons/2023-2024"
                            />
                        </Grid>
                    </Grid>

                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <ImgCard
                                img={
                                    images[
                                        Math.floor(
                                            Math.random() * images.length
                                        )
                                    ]
                                }
                                title="2022-2023 Season"
                                subtitle="Data and statistics from the 2022-2023 season"
                                buttonText="Explore"
                                cardClasses="season-card"
                                buttonClasses="season-button"
                                link="seasons/2022-2023"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <ImgCard
                                img={
                                    images[
                                        Math.floor(
                                            Math.random() * images.length
                                        )
                                    ]
                                }
                                title="2021-2022"
                                subtitle="Data and statistics from the 2021-2022 season"
                                buttonText="Explore"
                                cardClasses="season-card"
                                buttonClasses="season-button"
                                link="seasons/2021-2022"
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
            {/* <div className="row">
        <div className="col-6">
          <ImgCard
            img={all}
            title="All Seasons"
            subtitle="Data and statistics from all seasons combined on record"
            buttonText="Explore"
            cardClasses="season-card"
            buttonClasses="season-button"
            link="seasons/all"
          />
        </div>
        <div className="col-6">
          <ImgCard
            img={images[Math.floor(Math.random() * images.length)]}
            title="2023-2024"
            subtitle="Data and statistics from the 2022-2023 season"
            buttonText="Explore"
            cardClasses="season-card"
            buttonClasses="season-button"
            link="seasons/2023-2024"
          />
        </div>
      </div>
      <br />
      <div className="row">
        <div className="col-6">
          <ImgCard
            img={images[Math.floor(Math.random() * images.length)]}
            title="2022-2023"
            subtitle="Data and statistics from the 2021-2022 season"
            buttonText="Explore"
            cardClasses="season-card"
            buttonClasses="season-button"
            link="seasons/2022-2023"
          />
        </div>
        <div className="col-6">
          <ImgCard
            img={images[Math.floor(Math.random() * images.length)]}
            title="2021-2022"
            subtitle="Data and statistics from the 2021-2022 season"
            buttonText="Explore"
            cardClasses="season-card"
            buttonClasses="season-button"
            link="seasons/2021-2022"
          />
        </div>
      </div>
    </div> */}
        </>
    );
};

export default Seasons;
