import React from "react";
import TableBody from "./TableBody";
import TableHeader from "./TableHeader";

const Table = (props) => {
  const { columns, sortColumn, data, classNamePrefix } = props;

  return (
    <table className={`table ${classNamePrefix}`}>
      <TableHeader
        columns={columns}
        sortColumn={sortColumn}
        classNamePrefix={classNamePrefix}
      />
      <TableBody
        data={data}
        columns={columns}
        classNamePrefix={classNamePrefix}
      />
    </table>
  );
};

export default Table;
