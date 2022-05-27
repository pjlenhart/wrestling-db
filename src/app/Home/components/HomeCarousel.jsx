import React from "react";
import GenericCarousel from "../../common/Carousel/GenericCarousel";
import regionals from "../images/regionals_2022.jpg";
import jb_day from "../images/john_basilone_day_2022.jpg";
import lr_duals from "../images/lr_duals_2022.jpg";
import team_2021_2022 from "../images/wrestling_2021_2022.jpg";

const HomeCarousel = () => {
  const className = "carousel-caption";
  const images = [
    {
      path: regionals,
      alt: "3A North Regionals 2021-2022",
      caption: "3A North Regionals Feb. 2022",
    },
    {
      path: jb_day,
      alt: "Wrestlers doing the John Basilone Day Workout",
      caption: "The Annual John Basilone Day Workout Feb. 2022",
    },
    {
      path: lr_duals,
      alt: "Loch Raven Duals tournament afterwards",
      caption: "Loch Raven Duals Tournament Feb. 2022",
    },
    {
      path: team_2021_2022,
      alt: "Towson Wreslting Team 2021-2022",
      caption: "Towson High Wrestling Team 2021-2022",
    },
  ];
  return <GenericCarousel images={images} className={className} />;
};

export default HomeCarousel;
