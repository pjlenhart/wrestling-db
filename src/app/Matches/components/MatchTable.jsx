import React from "react";
import _ from "lodash";
import Table from "../../common/Table/Table";
import "../styles/matchStyles.css";

const MatchTable = (props) => {
  const { data, sortColumn } = props;

  const teamMatchColumns = [
    {
      path: "opponent_school",
      label: "Opponent",
    },
    {
      path: "match_date_formatted",
      label: "Match Date",
    },
    {
      path: "team_score",
      label: "Team Score",
    },
    {
      path: "opponent_score",
      label: "Opponent Score",
    },
    {
      path: "team_result",
      label: "Result",
    },
  ];

  return (
    <Table
      columns={teamMatchColumns}
      data={data}
      sortColumn={sortColumn}
      classNamePrefix="match-table"
    />
  );
};

export default MatchTable;
