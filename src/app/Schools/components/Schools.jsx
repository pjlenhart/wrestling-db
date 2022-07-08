import React from "react";
import SchoolPageView from "./SchoolPageView";
import "../styles/schoolStyles.css";

const Schools = (props) => {
  const { schools, regions } = props;

  return (
    <div className="container-fluid">
      <h1 className="h1-match">School Directory</h1>
      <h2>
        <b>Current MPSSAA Regions and Divisions</b>
      </h2>
      <SchoolPageView schools={schools} />
    </div>
  );
};

export default Schools;
