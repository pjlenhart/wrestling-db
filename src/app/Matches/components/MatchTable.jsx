import React from "react";
import _ from "lodash";
import Table from "../../common/Table/Table";
import "../styles/matchStyles.css";

const MatchTable = (props) => {
  const { data, columns, sortColumn } = props;

  return <Table columns={columns} data={data} sortColumn={sortColumn} />;
};

export default MatchTable;
