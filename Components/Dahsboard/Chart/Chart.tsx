'use client';

import React, { useState } from "react";
import styles from './Chart.module.css';
import ReactApexChart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";

const Chart: React.FC = () => {
  const [selectedRange, setSelectedRange] = useState<"Week" | "Month" | "Year">("Week");

  const options: ApexOptions = {
    chart: {
      type: "bar",
      height: 350,
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "50%",
        borderRadius: 3,
        distributed: false,
      },
    },
    colors: ["#556EE6", "#F1B44C", "#34C38F"],
    dataLabels: { enabled: false },
    stroke: { show: true, width: 2, colors: ["transparent"] },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
      labels: {
        style: { colors: "#8a8a8a", fontSize: "12px", fontWeight: "500" },
      },
      axisBorder: { show: true, color: "#e0e0e0" },
      axisTicks: { show: true, color: "#e0e0e0" },
    },
    yaxis: {
      labels: {
        formatter: (val: number) => val.toString(),
        style: { colors: "#8a8a8a", fontSize: "12px", fontWeight: "500" },
      },
    },
    grid: {
      borderColor: "#f1f1f1",
      strokeDashArray: 4,
      xaxis: { lines: { show: true } },
      yaxis: { lines: { show: true } },
    },
    tooltip: {
      y: { formatter: (val: number) => val.toString() },
    },
    legend: {
        show: false,
    },
  };

  const series = [
    { name: "Serie A", data: [44, 55, 41, 67, 22, 43, 21] },
    { name: "Serie B", data: [13, 23, 20, 8, 13, 27, 33] },
    { name: "Serie C", data: [11, 17, 15, 15, 21, 14, 15] },
  ];

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h2 className={styles.title}>Dashboard Analytics</h2>
        <div className={styles.buttons}>
          {["Week", "Month", "Year"].map((label) => (
            <button
              key={label}
              className={`${styles.rangeButton} ${selectedRange === label ? styles.active : ""}`}
              onClick={() => setSelectedRange(label as any)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height="100%"
      />
    </div>
  );
};

export default Chart;
