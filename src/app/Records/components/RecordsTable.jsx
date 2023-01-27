import React from "react";
import Table from "../../common/Table/Table";
import green from "../styles/green.png";
import yellow from "../styles/yellow.png";
import red from "../styles/red.png";

const RecordsTable = (props) => {
  const { records } = props;
  const recordColumns = [
    {
      path: "wrestler_name",
      label: "Name",
      content: (wrestler) =>
        wrestler.season === "Career" ? (
          <b>{wrestler.wrestler_name}</b>
        ) : (
          wrestler.wrestler_name
        ),
    },
    {
      path: "season",
      label: "Season",
      content: (wrestler) =>
        wrestler.season === "Career" ? (
          <b>{wrestler.season}</b>
        ) : (
          wrestler.season
        ),
    },
    {
      path: "wins",
      label: "Wins",
      content: (wrestler) =>
        wrestler.season === "Career" ? <b>{wrestler.wins}</b> : wrestler.wins,
    },
    {
      path: "losses",
      label: "Losses",
      content: (wrestler) =>
        wrestler.season === "Career" ? (
          <b>{wrestler.losses}</b>
        ) : (
          wrestler.losses
        ),
    },
    {
      path: "wins_by_pin",
      label: "Pins",
      content: (wrestler) =>
        wrestler.season === "Career" ? (
          <b>{wrestler.wins_by_pin}</b>
        ) : (
          wrestler.wins_by_pin
        ),
    },
    {
      path: "total_match_time",
      label: "Total Match Time",
      content: (wrestler) =>
        wrestler.season === "Career" ? (
          <b>{wrestler.total_match_time}</b>
        ) : (
          wrestler.total_match_time
        ),
    },
    {
      path: "avg_match_time",
      label: "Average Match Length",
      content: (wrestler) =>
        wrestler.season === "Career" ? (
          <b>{wrestler.avg_match_time}</b>
        ) : (
          wrestler.avg_match_time
        ),
    },
    {
      path: "wins",
      label: "Form",
      content: (wrestler) => {
        if (wrestler.wins > wrestler.losses)
          return <img src={green} alt="winning season" className="form-img" />;
        else if (wrestler.wins < wrestler.losses)
          return <img src={red} alt="losing season" className="form-img" />;
        else return <img src={yellow} alt="even season" className="form-img" />;
      },
    },
  ];
  return (
    <Table
      columns={recordColumns}
      data={records}
      sortColumn={""}
      classNamePrefix="record"
    />
  );
};

export default RecordsTable;
