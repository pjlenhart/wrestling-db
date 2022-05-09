import React from "react";

const AboutFAQImageSection = (props) => {
  const { img, alt, className, caption } = props;

  return (
    <figure>
      <img src={img} alt={alt} className={className ? className : ""} />
      <figcaption>
        <b>{caption}</b>
      </figcaption>
    </figure>
  );
};

export default AboutFAQImageSection;
