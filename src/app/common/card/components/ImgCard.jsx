import React from "react";
import { Link, NavLink } from "react-router-dom";
import "../styles/cardStyles.css";

const ImgCard = (props) => {
  const { img, title, subtitle, buttonText, link, buttonClasses, cardClasses } =
    props;

  return (
    <div className={`card ${cardClasses}`}>
      <img
        src={img}
        className="card-img-cust"
        alt="Not able to display photo."
      />
      <div>
        <h3 className="card-title">{title}</h3>
        <p className="card-text">{subtitle}</p>
        <Link
          to={`/${link}`}
          className={`card-button ${buttonClasses}`}
          hide="true"
        >
          {buttonText}
        </Link>
      </div>
    </div>
  );
};

export default ImgCard;
