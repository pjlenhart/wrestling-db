import React, { useState } from "react";

const SeasonCountdown = () => {
  const calcDayDiff = () => {
    const today = new Date();
    const startDate = new Date(`11/15/${today.getFullYear()}`);
    const diffTime = Math.abs(startDate - today);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };
  return <p>There are {calcDayDiff()} days until next season</p>;
};

export default SeasonCountdown;
