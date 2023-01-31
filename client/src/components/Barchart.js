import { Bar } from "react-chartjs-2";
import React from "react";
import { Chart as ChartJS } from "chart.js/auto";

const BarChart = ({ chartData }) => {
  return (
    <div className="chart-container">
      <h2 style={{ textAlign: "center" }}>Sales</h2>
      <Bar
        style={{ width: 100, height: 100 }}
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Sales",
            },
            legend: {
              display: false,
            },
          },
        }}
      />
    </div>
  );
};

export default BarChart;
