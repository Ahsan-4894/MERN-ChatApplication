import React from "react";
import { Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Tooltip,
  Filler,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Legend,
  plugins,
} from "chart.js";
import { getLast7DayLabels } from "../../lib/features.js";

ChartJS.register(
  CategoryScale,
  Tooltip,
  LinearScale,
  LineElement,
  PointElement,
  Filler,
  ArcElement,
  Legend
);

const lineChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      beginAtZero: true,
      grid: {
        display: false,
      },
    },
  },
};
const doughnutChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  cutout:120
}


const labels = getLast7DayLabels();

export const LineChart = ({dataArr = []}) => {
  const data = {
    labels: labels,
    datasets: [
      {
        data: dataArr,
        label: "Revenue",
        fill: true,
        backgroundColor: "rgba(75, 12,192,0.1)",
        borderColor: "rgba(75, 12,192,1)",
      },
    ],
  };

  return <Line data={data} options={lineChartOptions} />;
};

export const DoughnutChart = ({labels, dataArr}) => {
  const data = {
    labels: labels,
    datasets: [
      {
        data: dataArr,
        label: "Single Chats vs Group Chats",
        fill: false,
        backgroundColor: ["rgba(75, 12,192,0.1)", "#4A2574"],
        borderColor: ["rgba(75, 12,192,.1)", "rgba(175, 192,192,1)"],
        offset:10
      },
    ],
  };
  return <Doughnut data={data} options={doughnutChartOptions}/>;
};
