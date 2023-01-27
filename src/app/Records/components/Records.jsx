import React, { Component } from "react";
import "../styles/recordStyles.css";
import RecordsTable from "./RecordsTable";

const Records = (props) => {
  const { records } = props;
  return (
    <div className="container">
      <h1 className="h1-match">Records</h1>
      <h2>
        <b>Records by Wrestler, by year</b>
      </h2>
      <RecordsTable records={records} />
    </div>
  );
};

export default Records;
