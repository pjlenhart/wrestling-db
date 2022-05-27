import React, { useState, useEffect } from "react";
import { getWrestlers, getWrestlerById } from "../../services/rosterService";
import Table from "../../common/Table/Table";

const RosterTable = (props) => {
  const { data, sortColumn } = props;
  const wrestlerColumns = [
    { path: "wrestler_name", label: "Name" },
    { path: "classOf", label: "Class" },
  ];
  return (
    <Table columns={wrestlerColumns} data={data} sortColumn={sortColumn} />
  );
};

export default RosterTable;
