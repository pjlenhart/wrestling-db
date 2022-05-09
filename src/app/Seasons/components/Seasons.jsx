import React from "react";
import season2021_2022 from "../pictures/wrestling_2021-2022.jpg";
import all from "../pictures/towsong.jpg";
import ImgCard from "../../common/card/components/ImgCard";
import SeasonTitle from "./SeasonTitle";
import "../styles/styles.css";

const Seasons = (props) => {
  return (
    <div className="container">
      <SeasonTitle />
      <div className="row">
        <div className="col-6">
          <ImgCard
            img={season2021_2022}
            title="2021-2022"
            subtitle="Data and statistics from the 2021-2022 season"
            buttonText="Explore"
            cardClasses="season-card"
            buttonClasses="season-button"
            link="seasons/2021-2022"
          />
        </div>
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
      </div>
    </div>
  );
};

export default Seasons;
