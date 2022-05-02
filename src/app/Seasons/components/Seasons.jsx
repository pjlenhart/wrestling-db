import React from "react";
import season2021_2022 from "../pictures/wrestling_2021-2022.jpg";
import all from "../pictures/towsong.jpg";
import ImgCard from "../../common/card/ImgCard";
import "../styles/styles.css";

const Seasons = (props) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-6">
          <ImgCard
            img={season2021_2022}
            height="700"
            title="2021-2022"
            subtitle="Explore data and statistics from the 2021-2022 season"
            buttonText="Explore"
            link="2021-2022"
          />
        </div>
        <div className="col-6">
          <ImgCard
            img={all}
            height="700"
            title="All Seasons"
            subtitle="Explore data and statistics from all seasons combined on record"
            buttonText="Explore"
            link="all"
          />
        </div>
      </div>
      {/* <div className="row">
        <div className="col-6">
          <ImgCard
            img={season2021_2022}
            height="700"
            title="2021-2022"
            subtitle="Explore data and statistics from the 2021-2022 season"
            buttonText="Explore"
            link="2021-2022"
          />
        </div>
        <div className="col-6">
          <ImgCard
            img={all}
            height="700"
            title="All Seasons"
            subtitle="Explore data and statistics from all seasons combined on record"
            buttonText="Explore"
            link="all"
          />
        </div>
      </div> */}
    </div>
  );
};

export default Seasons;
