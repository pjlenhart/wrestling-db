import React from "react";
import RosterTable from "../../Home/components/RosterTable";
import "../styles/wrestlerStyles.css";

const Wrestlers = (props) => {
  const { roster } = props;

  return (
    <div className="container">
      <h1 className="h1-match">Wrestlers Directory</h1>
      <div className="wrestler-table">
        <RosterTable data={roster} sortColumn="wrestler_name" />
      </div>
    </div>
  );
};

export default Wrestlers;
