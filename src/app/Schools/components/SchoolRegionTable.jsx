import React from "react";
import Table from "../../common/Table/Table";

const SchoolRegionTable = (props) => {
  const columns = [
    { path: "school_name", label: props.header },
    { path: "county", label: "" },
  ];

  return (
    <>
      <Table
        data={props.data}
        columns={columns}
        sortColumn=""
        classNamePrefix="school-table"
      />
    </>
  );
};

export default SchoolRegionTable;
