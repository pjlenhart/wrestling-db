import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";
import Table from "../../common/Table/Table";

const WrestlerStatBox = (props) => {
  const { data } = props;

  ChartJS.register(ArcElement, Tooltip);

  const xValues = {
    winLoss: ["Wins", "Losses"],
    forAgainst: ["For", "Against"],
    outcomes: ["Pin", "Minor Dec.", "Maj. Dec.", "Tech Fall"],
    periods: ["1st", "2nd", "3rd", "OT"],
  };

  const yValues = !data
    ? null
    : {
        winLoss: [data.wins, data.losses],
        takedowns: [data.takedowns_for, data.takedowns_against],
        reversals: [data.reversals_for, data.reversals_against],
        escapes: [data.escapes_for, data.escapes_against],
        nearfalls: [data.near_falls_for, data.near_falls_against],
        takedownPoints: [
          data.takedown_points_for,
          data.takedown_points_against,
        ],
        reversalPoints: [
          data.reversal_points_for,
          data.reversal_points_against,
        ],
        escapePoints: [data.escape_points_for, data.escape_points_against],
        nearfallPoints: [
          data.near_fall_points_for,
          data.near_fall_points_against,
        ],
        penalties: [data.penalties_for, data.penalties_against],
        penaltyPoints: [data.penalty_points_for, data.penalty_points_against],
        totalPoints: [data.total_points_for, data.total_points_against],
        winDetail: [
          data.wins_by_pin,
          data.wins_by_minor_decision,
          data.wins_by_major_decision,
          data.wins_by_tech_fall,
        ],
        lossDetail: [
          data.losses_by_pin,
          data.losses_by_minor_decision,
          data.losses_by_major_decision,
          data.losses_by_tech_fall,
        ],
        period: [
          data.matches_end_first_period,
          data.matches_end_second_period,
          data.matches_end_third_period,
          data.matches_end_overtime,
        ],
      };

  const graphData = !data
    ? null
    : {
        winLoss: {
          labels: xValues.winLoss,
          datasets: [
            {
              data: yValues.winLoss,
              backgroundColor: ["maroon", "gray"],
              borderColor: ["black", "black"],
              borderWidth: 1,
            },
          ],
        },
        takedowns: {
          labels: xValues.forAgainst,
          datasets: [
            {
              data: yValues.takedowns,
              backgroundColor: ["maroon", "gray"],
              borderColor: ["black", "black"],
              borderWidth: 1,
            },
          ],
        },
        reversals: {
          labels: xValues.forAgainst,
          datasets: [
            {
              data: yValues.reversals,
              backgroundColor: ["maroon", "gray"],
              borderColor: ["black", "black"],
              borderWidth: 1,
            },
          ],
        },
        escapes: {
          labels: xValues.forAgainst,
          datasets: [
            {
              data: yValues.escapes,
              backgroundColor: ["maroon", "gray"],
              borderColor: ["black", "black"],
              borderWidth: 1,
            },
          ],
        },
        nearFalls: {
          labels: xValues.forAgainst,
          datasets: [
            {
              data: yValues.nearfalls,
              backgroundColor: ["maroon", "gray"],
              borderColor: ["black", "black"],
              borderWidth: 1,
            },
          ],
        },
        takedownPoints: {
          labels: xValues.forAgainst,
          datasets: [
            {
              data: yValues.takedownPoints,
              backgroundColor: ["maroon", "gray"],
              borderColor: ["black", "black"],
              borderWidth: 1,
            },
          ],
        },
        reversalPoints: {
          labels: xValues.forAgainst,
          datasets: [
            {
              data: yValues.reversalPoints,
              backgroundColor: ["maroon", "gray"],
              borderColor: ["black", "black"],
              borderWidth: 1,
            },
          ],
        },
        escapePoints: {
          labels: xValues.forAgainst,
          datasets: [
            {
              data: yValues.escapePoints,
              backgroundColor: ["maroon", "gray"],
              borderColor: ["black", "black"],
              borderWidth: 1,
            },
          ],
        },
        nearfallPoints: {
          labels: xValues.forAgainst,
          datasets: [
            {
              data: yValues.nearfallPoints,
              backgroundColor: ["maroon", "gray"],
              borderColor: ["black", "black"],
              borderWidth: 1,
            },
          ],
        },
        penalties: {
          labels: xValues.forAgainst,
          datasets: [
            {
              data: yValues.penalties,
              backgroundColor: ["maroon", "gray"],
              borderColor: ["black", "black"],
              borderWidth: 1,
            },
          ],
        },
        penaltyPoints: {
          labels: xValues.forAgainst,
          datasets: [
            {
              data: yValues.penaltyPoints,
              backgroundColor: ["maroon", "gray"],
              borderColor: ["black", "black"],
              borderWidth: 1,
            },
          ],
        },
        totalPoints: {
          labels: xValues.forAgainst,
          datasets: [
            {
              data: yValues.totalPoints,
              backgroundColor: ["maroon", "gray"],
              borderColor: ["black", "black"],
              borderWidth: 1,
            },
          ],
        },
        winDetail: {
          labels: xValues.outcomes,
          datasets: [
            {
              data: yValues.winDetail,
              backgroundColor: ["maroon", "gray", "yellow", "green"],
              borderColor: ["black", "black", "black", "black"],
              borderWidth: 1,
            },
          ],
        },
        lossDetail: {
          labels: xValues.outcomes,
          datasets: [
            {
              data: yValues.lossDetail,
              backgroundColor: ["maroon", "gray", "yellow", "green"],
              borderColor: ["black", "black", "black", "black"],
              borderWidth: 1,
            },
          ],
        },
        period: {
          labels: xValues.periods,
          datasets: [
            {
              data: yValues.period,
              backgroundColor: ["maroon", "gray", "yellow", "green"],
              borderColor: ["black", "black", "black", "black"],
              borderWidth: 1,
            },
          ],
        },
      };

  //************************************************************************************************* */
  // make charts variable an array and use the already created common table to make the table more dynamic.
  // define the columns and rows. Columns should just be 3 blank headers
  // rows are Statistic name, number, and then graph, much easier than defining every tr and td separately
  //************************************************************************************************* */
  const chartNames = [
    "winLoss",
    "takedowns",
    "reversals",
    "escapes",
    "nearFalls",
    "takedownPoints",
    "reversalPoints",
    "escapePoints",
    "nearfallPoints",
    "penalties",
    "penaltyPoints",
    "totalPoints",
    "winDetail",
    "lossDetail",
    "period",
  ];
  const charts = !graphData
    ? null
    : chartNames.map((chart) => (
        <div
          style={{ width: "150px", height: "100px" }}
          className="container-fluid"
        >
          <Doughnut data={graphData[`${chart}`]} />
        </div>
      ));
  //   const charts = {
  //     winLoss: (
  //       <div
  //         style={{ width: "150px", height: "100px" }}
  //         className="container-fluid"
  //       >
  //         <Doughnut data={graphData?.winLoss} />
  //       </div>
  //     ),
  //     takedowns: (
  //       <div
  //         style={{ width: "150px", height: "100px" }}
  //         className="container-fluid"
  //       >
  //         <Doughnut data={graphData?.takedowns} />
  //       </div>
  //     ),
  //     reversals: (
  //       <div
  //         style={{ width: "150px", height: "100px" }}
  //         className="container-fluid"
  //       >
  //         <Doughnut data={graphData?.reversals} />
  //       </div>
  //     ),
  //     escapes: (
  //         <div
  //           style={{ width: "150px", height: "100px" }}
  //           className="container-fluid"
  //         >
  //           <Doughnut data={graphData?.escapes} />
  //         </div>
  //       ),
  //       nearFalls: (
  //         <div
  //           style={{ width: "150px", height: "100px" }}
  //           className="container-fluid"
  //         >
  //           <Doughnut data={graphData?.nearFalls} />
  //         </div>
  //       ),
  //       takedownPoints: (
  //         <div
  //           style={{ width: "150px", height: "100px" }}
  //           className="container-fluid"
  //         >
  //           <Doughnut data={graphData?.takedownPoints} />
  //         </div>
  //       ),
  //       reversals: (
  //         <div
  //           style={{ width: "150px", height: "100px" }}
  //           className="container-fluid"
  //         >
  //           <Doughnut data={graphData?.reversals} />
  //         </div>
  //       ),
  //   };

  const columns = [
    { path: "stat", label: "Statistic" },
    { path: "numerical", label: "Value" },
    { path: "graph", label: "Graphical Representation" },
  ];

  const rows = !data
    ? null
    : [
        {
          stat: "Wins-Losses",
          numerical: `${data.wins}-${data.losses}`,
          graph: charts[0],
        },
        {
          stat: "Takedowns For/Against",
          numerical: `${data.takedowns_for} / ${data.takedowns_against}`,
          graph: charts[1],
        },
        {
          stat: "Reversals For/Against",
          numerical: `${data.reversals_for} / ${data.reversals_against}`,
          graph: charts[2],
        },
        {
          stat: "Escapes For/Against",
          numerical: `${data.escapes_for} / ${data.escapes_against}`,
          graph: charts[3],
        },
        {
          stat: "Near Falls For/Against",
          numerical: `${data.near_falls_for} / ${data.near_falls_against}`,
          graph: charts[4],
        },
        {
          stat: "Takedown Points For/Against",
          numerical: `${data.takedown_points_for} / ${data.takedown_points_against}`,
          graph: charts[5],
        },
        {
          stat: "Reversal Points For/Against",
          numerical: `${data.reversal_points_for} / ${data.reversal_points_against}`,
          graph: charts[6],
        },
        {
          stat: "Escape Points For/Against",
          numerical: `${data.escape_points_for} / ${data.escape_points_against}`,
          graph: charts[7],
        },
        {
          stat: "Near Fall Points For/Against",
          numerical: `${data.near_fall_points_for} / ${data.near_fall_points_against}`,
          graph: charts[8],
        },
        {
          stat: "Penalties For/Against",
          numerical: `${data.penalties_for} / ${data.penalties_against}`,
          graph: charts[9],
        },
        {
          stat: "Penalty Points For/Against",
          numerical: `${data.penalty_points_for} / ${data.penalty_points_against}`,
          graph: charts[10],
        },
        {
          stat: "Total Points For/Against",
          numerical: `${data.total_points_for} / ${data.total_points_against}`,
          graph: charts[11],
        },
        {
          stat: "Win Method Breakdown",
          numerical: (
            <ul style={{ textAlign: "left" }}>
              <li>{`${data.wins_by_pin} by Pin`}</li>
              <li>{`${data.wins_by_minor_decision} by Minor Dec.`}</li>
              <li>{`${data.wins_by_major_decision} by Maj. Dec.`}</li>
              <li>{`${data.wins_by_tech_fall} by Tech Fall`}</li>
            </ul>
          ),
          graph: charts[12],
        },
        {
          stat: "Loss Method Breakdown",
          numerical: (
            <ul style={{ textAlign: "left" }}>
              <li>{`${data.losses_by_pin} by Pin`}</li>
              <li>{`${data.losses_by_minor_decision} by Minor Dec.`}</li>
              <li>{`${data.losses_by_major_decision} by Maj. Dec.`}</li>
              <li>{`${data.losses_by_tech_fall} by Tech Fall`}</li>
            </ul>
          ),
          graph: charts[13],
        },
        {
          stat: "Period Match Ended Breakdown",
          numerical: (
            <ul style={{ textAlign: "left" }}>
              <li>{`${data.matches_end_first_period} in 1st`}</li>
              <li>{`${data.matches_end_second_period} in 2nd`}</li>
              <li>{`${data.matches_end_third_period} in 3rd`}</li>
              <li>{`${data.matches_end_overtime} in OT`}</li>
            </ul>
          ),
          graph: charts[14],
        },
        {
          stat: "Total Match Time",
          numerical: `${data.total_match_time}`,
          graph: "-",
        },
        {
          stat: "Average Match Time",
          numerical: `${data.avg_match_time}`,
          graph: "-",
        },
        {
          stat: "Total Non-Forfeit Matches",
          numerical: `${data.total_non_ff_matches}`,
          graph: "-",
        },
        {
          stat: "Total Matches",
          numerical: `${data.total_matches}`,
          graph: "-",
        },
      ];

  return data ? (
    <>
      {console.log(charts)}
      <Table
        columns={columns}
        data={rows}
        sortColumn=""
        classNamePrefix="stat-table"
      />
    </>
  ) : null;
};

export default WrestlerStatBox;
