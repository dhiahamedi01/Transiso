'use client';

import React, { useEffect, useState } from "react";
import styles from './Chart.module.css';
import ReactApexChart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";

type Order = {
  createdAt: string;
  status: string;
};

const Chart: React.FC = () => {
  const [selectedRange, setSelectedRange] = useState<"Week" | "Month" | "Year">("Year");
  const [series, setSeries] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/Liste_order');
        const json = await res.json();
        if (json.success) {
          const orders: Order[] = json.data;

          // Initialiser les mois (Jan à Jul)
          const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];
          const pendingData = Array(7).fill(0);
          const deliveredData = Array(7).fill(0);
          const otherData = Array(7).fill(0);

          orders.forEach((order) => {
            const date = new Date(order.createdAt);
            const month = date.getMonth(); // 0-indexed (Jan = 0)

            if (month <= 6) {
              if (order.status === "Pending") {
                pendingData[month]++;
              } else if (order.status === "Delivered") {
                deliveredData[month]++;
              } else {
                otherData[month]++;
              }
            }
          });

          setSeries([
            { name: "Pending", data: pendingData },
            { name: "Delivered", data: deliveredData },
            { name: "Other", data: otherData },
          ]);
        }
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      }
    };

    fetchData();
  }, [selectedRange]); // You could filter differently by selectedRange

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
    colors: ["#F1B44C", "#34C38F", "#556EE6"], // Pending, Delivered, Other
    dataLabels: { enabled: false },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"]
    },
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
      show: true,
      position: "bottom",
      fontSize: "14px",
      labels: { colors: "#6c757d" },
    },
  };

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
