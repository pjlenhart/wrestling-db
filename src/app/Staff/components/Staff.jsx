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
        "Coach PJ has been head coach since 2020 after previously being an assistant coach from 2017-2020, all at Towson High. In High School, Coach PJ wrestled for Towson High for 2 years in the 182 and 195 pound weight class. Last year, the varsity team produced four state qualifiers and one state placer, our first in 9 years. Coach PJ currently is a Software Engineer specializing in web development which allowed him the skills and opportunity to create this website for the program.",
    },
    {
      img: phil,
      title: "Coach Phil Simmonds - Head JV Coach",
      subtitle:
        "Coach Simmonds has been head JV coach since 2020 after serving as Varsity Head Coach of Towson High from 2000-2020. Coach Simmonds has an incredible amount of wrestling knowledge having been around the sport for most of his life.  During his time at Towson, Coach Simmonds has produced 2 state champions and several other medalists at various levels. Coach Simmonds is an alumni of Baltimore Polytechnic High School and a Baltimore native. He is also a Marine Corps veteran.",
    },
    {
      img: pete,
      title: "Coach Pete Zaleski - Varsity Assistant Coach",
      subtitle:
        "Coach Pete has been varsity assistant coach for 1 year. Coach Pete wrestled all 4 years of his high school career at Towson High under Coach Simmonds and brings wrestling knowledge that helped him wrestle at a high level, including several regional championship tournament matches. With this, Coach Pete helped our varsity team send four wrestlers to the state championships with one placing 5th. After high school, Coach Pete attended Shippensburg University where he obtained his Bachelor's degree in Exercise Science. This has helped take the program's conditioning and training to the next level.",
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
