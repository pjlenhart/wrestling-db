import React from "react";
import FlipClock from "x-react-flipclock";

const SeasonCountdown = () => {
  const calcCountdownDay = () => {
    const today = new Date();
    return `${today.getFullYear()}-11-15 00:00:00`;
  };

  return (
    <FlipClock
      type="countdown"
      count_to={calcCountdownDay()}
      units={[
        {
          sep: "",
          type: "days",
          title: "days",
        },
        {
          sep: " ",
          type: "hours",
          title: "hours",
        },
        {
          sep: ":",
          type: "minutes",
          title: "minutes",
        },
      ]}
    />
  );
};

export default SeasonCountdown;
