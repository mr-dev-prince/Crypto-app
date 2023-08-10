import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as Chartjs,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

Chartjs.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const Chart = ({ arr = [], currency, days }) => {
  const prices = [];
  const date = [];
  const data = {
    labels: date,
    datasets: [
      {
        label: `price in ${currency}`,
        data: prices,
        borderColor: "rgb(255,92,132)",
        backgroundColor: "rgba(255,92,132, 0.7)",
      },
    ],
  };

  for (let i = 0; i < arr.length; i++) {
    if (days === "24h") {
      date.push(new Date(arr[i][0]).toTimeString()); 
    } else {
      date.push(new Date(arr[i][0]).toLocaleDateString());
    }
    prices.push(arr[i][1]);
  }

  return <Line options={{ responsive: true }} data={data} />;
};

export default Chart;
