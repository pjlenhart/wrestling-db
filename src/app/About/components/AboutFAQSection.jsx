import React from "react";
import "../styles/aboutStyles.css";

const AboutFAQSection = (props) => {
  const { sectionHeader, description } = props;

  return (
    <>
      <article>
        <br />
        <br />
        <h2 className="h2-about">
          <b>{sectionHeader}</b>
        </h2>
        <br />
        <br />
        <p>{description}</p>
        <hr />
      </article>
    </>
  );
};

export default AboutFAQSection;
