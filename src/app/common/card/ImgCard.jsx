import React from "react";
import { Link, NavLink } from "react-router-dom";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";

const ImgCard = (props) => {
  const { img, title, subtitle, buttonText, link, height } = props;

  return (
    <Card className="season-card">
      <CardMedia
        component="img"
        height={height ? height : "500"}
        image={img}
        alt={subtitle}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {subtitle}
        </Typography>
      </CardContent>
      <CardActions>
        <Link to={`/seasons/${link}`} className="btn btn-lg btn-warning">
          {buttonText}
        </Link>
      </CardActions>
    </Card>
  );
};

export default ImgCard;
