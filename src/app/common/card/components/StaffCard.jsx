import React from "react";
import "../styles/staffCardStyles.css";

const StaffCard = (props) => {
  const { img, title, subtitle, buttonText, link, buttonClasses, cardClasses } =
    props;

  return (
    <div className={`card ${cardClasses}`}>
      <img
        src={img}
        className="staff-card-img-cust"
        alt="Not able to display photo."
      />
      <div>
        <h3 className="staff-card-title">{title}</h3>
        <p className="staff-card-text">{subtitle}</p>
      </div>
    </div>
  );
};
export default StaffCard;
