import React, { Component } from "react";
import pj from "../images/coach_pj.jpg";
import phil from "../images/phil.jpg";
import pete from "../images/pete (2).jpg";
import StaffCard from "../../common/card/components/StaffCard";
import "../styles/staffStyles.css";
import AboutFAQSection from "./../../About/components/AboutFAQSection";

const Staff = () => {
  const staffInfo = [
    {
      img: pj,
      title: "Coach PJ Lenhart - Head Coach",
      subtitle:
        "Coach PJ has been head coach for 2 years after previously being an assistant coach for 3 years, all at Towson High. In High School, Coach PJ wrestled for Towson High for 2 years in the 182 and 195 pound weight class. Last year, the varsity team produced four state qualifiers and one state placer, our first in 9 years.",
    },
    {
      img: phil,
      title: "Coach Phil Simmonds - Head JV Coach",
      subtitle:
        "Coach Simmonds has been head JV coach for 2 years after serving the previous 19 years as Varsity Head Coach of Towson High. Coach Simmonds has an incredible amount of wrestling knowledge having been around the sport for most of his life.  During his time as Towson, Coach Simmonds has produced 2 state champions and several other medalists at various levels. Coach Simmonds is an alumni of Baltimore Polytechnic High School.",
    },
    {
      img: pete,
      title: "Coach Pete Zaleski - Varsity Assistant Coach",
      subtitle:
        "Coach Pete has been varsity assistant coach for 1 year. Coach Pete wrestled all 4 years of his high school career at Towson High under Coach Simmonds and brings wrestling knowledge that helped him wrestle at a high level, including several regional championship tournament matches. With this, Coach Pete helped our varsity team send four wrestlers to the state championships with one placing 5th.",
    },
  ];

  return (
    <div className="container-fluid">
      <h1 className="h1-staff">Coaching Staff</h1>
      <br />
      <br />
      <h2 className="h2-staff">
        <b> Meet the coaches of Towson High School Wrestling!</b>
      </h2>
      <div>
        {staffInfo.map((staff) => (
          <div className="staff-info">
            <AboutFAQSection
              sectionHeader={staff.title}
              description={staff.subtitle}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Staff;
