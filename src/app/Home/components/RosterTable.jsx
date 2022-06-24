import React, { useState, useEffect } from "react";
import { getWrestlers, getWrestlerById } from "../../services/rosterService";
import { Link } from "react-router-dom";
import Table from "../../common/Table/Table";

const RosterTable = (props) => {
  const { data, sortColumn } = props;
  const wrestlerColumns = [
    {
      path: "wrestler_name",
      label: "Name",
      content: (wrestler) => (
        <Link
          to={`/wrestlers/${wrestler.wrestler_id}`}
          style={{ color: "maroon" }}
        >
          {wrestler.wrestler_name}
        </Link>
      ),
    },
    { path: "classOf", label: "Class" },
  ];
  return (
    <Table columns={wrestlerColumns} data={data} sortColumn={sortColumn} />
  );
};

export default RosterTable;
