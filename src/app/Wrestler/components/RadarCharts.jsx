import React from "react";
import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  PointElement,
  Filler,
  RadialLinearScale,
  LineElement,
} from "chart.js";

const RadarChart = (props) => {
  const { chartData } = props;

  ChartJS.register(
    RadialLinearScale,
    Tooltip,
    PointElement,
    LineElement,
    Filler
  );

  const dataSet = !chartData
    ? null
    : {
        you: [
          { title: "Takedowns", value: chartData[0]?.takedowns_for },
          { title: "Reversals", value: chartData[0]?.reversals_for },
          { title: "Escapes", value: chartData[0]?.escapes_for },
          { title: "Near Falls", value: chartData[0]?.near_falls_for },
          { title: "Penalties", value: chartData[0]?.penalties_for },
        ],
        opponents: [
          { title: "Takedowns", value: chartData[0]?.takedowns_against },
          { title: "Reversals", value: chartData[0]?.reversals_against },
          { title: "Escapes", value: chartData[0]?.escapes_against },
          { title: "Near Falls", value: chartData[0]?.near_falls_against },
          { title: "Penalties", value: chartData[0]?.penalties_against },
        ],
      };

  const labels = [
    "Takedowns",
    "Reversals",
    "Escapes",
    "Near Falls",
    "Penalties",
  ];
  const youData = [];
  dataSet.you.map((item) => {
    youData.push(item.value);
  });
  const opponentData = [];
  dataSet.opponents.map((item) => {
    opponentData.push(item.value);
  });

  const radarData = {
    labels: labels,
    datasets: [
      {
        label: chartData[0]?.wrestler_name,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "#800000",
        pointBackgroundColor: "#800000",
        pointBorderColor: "#000000",
        pointHoverBackgroundColor: "#A24857",
        pointHoverBorderColor: "#800000",
        data: youData,
      },
      {
        label: `Opponents vs. ${chartData[0]?.wrestler_name}`,
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "#808080",
        pointBackgroundColor: "#808080",
        pointBorderColor: "#000000",
        pointHoverBackgroundColor: "#D3D3D3",
        pointHoverBorderColor: "#800000",
        data: opponentData,
      },
    ],
  };

  const radarOptions = {
    scales: {
      r: {
        pointLabels: {
          font: {
            size: 20,
            family: "roboto-bold",
          },
        },
        ticks: {
          beginAtZero: true,
          stepSize: 2,
        },
        responsive: true,
        angleLines: {
          display: true,
          color: "black",
          lineWidth: 1,
        },
        grid: {
          display: true,
          color: "gray",
          circular: true,
        },
        reSize: true,
      },
    },
  };

  return (
    <>
      <div
        className="container-fluid"
        style={{ width: 750, height: 750, border: 3 }}
      >
        <Radar data={radarData} options={radarOptions} />
      </div>
      <hr />
    </>
  );
};

export default RadarChart;
