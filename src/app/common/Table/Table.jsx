import React, { Component } from "react";
import TableBody from "./TableBody";
import TableHeader from "./TableHeader";

const Table = (props) => {
  const { columns, sortColumn, data } = props;

  return (
    <table className="table">
      <TableHeader columns={columns} sortColumn={sortColumn} />
      <TableBody data={data} columns={columns} />
    </table>
  );
};

export default Table;
