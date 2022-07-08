import React from "react";
import SchoolRegionTable from "./SchoolRegionTable";

const SchoolPageView = (props) => {
  const { schools } = props;
  return (
    <div>
      <div className="row">
        <div className="col-3">
          <SchoolRegionTable
            data={schools.filter((school) => school.region === "4A North")}
            header={"4A North"}
          />
        </div>
        <div className="col-3">
          <SchoolRegionTable
            data={schools.filter((school) => school.region === "4A East")}
            header={"4A East"}
          />
        </div>
        <div className="col-3">
          <SchoolRegionTable
            data={schools.filter((school) => school.region === "4A South")}
            header={"4A South"}
          />
        </div>
        <div className="col-3">
          <SchoolRegionTable
            data={schools.filter((school) => school.region === "4A West")}
            header={"4A West"}
          />
        </div>
      </div>
      <hr />
      <br />
      <div className="row">
        <div className="col-3">
          <SchoolRegionTable
            data={schools.filter((school) => school.region === "3A North")}
            header={"3A North"}
          />
        </div>
        <div className="col-3">
          <SchoolRegionTable
            data={schools.filter((school) => school.region === "3A East")}
            header={"3A East"}
          />
        </div>
        <div className="col-3">
          <SchoolRegionTable
            data={schools.filter((school) => school.region === "3A South")}
            header={"3A South"}
          />
        </div>
        <div className="col-3">
          <SchoolRegionTable
            data={schools.filter((school) => school.region === "3A West")}
            header={"3A West"}
          />
        </div>
      </div>
      <hr />
      <br />
      <div className="row">
        <div className="col-3">
          <SchoolRegionTable
            data={schools.filter((school) => school.region === "2A North")}
            header={"2A North"}
          />
        </div>
        <div className="col-3">
          <SchoolRegionTable
            data={schools.filter((school) => school.region === "2A East")}
            header={"2A East"}
          />
        </div>
        <div className="col-3">
          <SchoolRegionTable
            data={schools.filter((school) => school.region === "2A South")}
            header={"2A South"}
          />
        </div>
        <div className="col-3">
          <SchoolRegionTable
            data={schools.filter((school) => school.region === "2A West")}
            header={"2A West"}
          />
        </div>
      </div>
      <hr />
      <br />
      <div className="row">
        <div className="col-3">
          <SchoolRegionTable
            data={schools.filter((school) => school.region === "1A North")}
            header={"1A North"}
          />
        </div>
        <div className="col-3">
          <SchoolRegionTable
            data={schools.filter((school) => school.region === "1A East")}
            header={"1A East"}
          />
        </div>
        <div className="col-3">
          <SchoolRegionTable
            data={schools.filter((school) => school.region === "1A South")}
            header={"1A South"}
          />
        </div>
        <div className="col-3">
          <SchoolRegionTable
            data={schools.filter((school) => school.region === "1A West")}
            header={"1A West"}
          />
        </div>
      </div>
      <hr />
      <br />
    </div>
  );
};

export default SchoolPageView;
