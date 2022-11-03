import React from "react";
import all from "../pictures/towsong.jpg";
import guy from "../pictures/guy.png";
import shoes from "../pictures/shoes.png";
import wrestlers from "../pictures/wrestlers.png";
import ImgCard from "../../common/card/components/ImgCard";
import SeasonTitle from "./SeasonTitle";
import "../styles/styles.css";

const Seasons = (props) => {
  const images = [guy, shoes, wrestlers];
  return (
    <div className="container">
      <SeasonTitle />
      <div className="row">
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
            title="2021-2022"
            subtitle="Data and statistics from the 2021-2022 season"
            buttonText="Explore"
            cardClasses="season-card"
            buttonClasses="season-button"
            link="seasons/2021-2022"
          />
        </div>
      </div>
    </div>
  );
};

export default Seasons;
