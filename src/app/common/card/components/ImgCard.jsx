import React from 'react';
import '../styles/cardStyles.css';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

const ImgCard = (props) => {
    const { img, title, subtitle, buttonText, link } = props;

    return (
        <Grid item>
            <CardActionArea component="a" href={link}>
                <Card sx={{ display: 'flex' }}>
                    <CardContent sx={{ flex: 1 }}>
                        <Typography component="h2" variant="h5">
                            {title}
                        </Typography>
                        <Typography variant="subtitle1" paragraph>
                            {subtitle}
                        </Typography>
                        <Typography variant="subtitle1" color="primary">
                            {buttonText}
                        </Typography>
                    </CardContent>
                    <CardMedia
                        component="img"
                        sx={{
                            width: 160,
                            display: { xs: 'none', sm: 'block' },
                        }}
                        image={img}
                        alt={'wrestling image'}
                    />
                </Card>
            </CardActionArea>
        </Grid>
        // <div className={`card ${cardClasses}`}>
        //   <img
        //     src={img}
        //     className="card-img-cust"
        //     alt="Not able to display photo."
        //   />
        //   <div>
        //     <h3 className="card-title">{title}</h3>
        //     <p className="card-text">{subtitle}</p>
        //     <Link
        //       to={`/${link}`}
        //       className={`card-button ${buttonClasses}`}
        //       hide="true"
        //     >
        //       {buttonText}
        //     </Link>
        //   </div>
        // </div>
    );
};

export default ImgCard;
