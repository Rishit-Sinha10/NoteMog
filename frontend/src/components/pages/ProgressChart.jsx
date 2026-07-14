import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export function ProgressChart() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartRef.current && !chartInstance.current) {
      const ctx = chartRef.current.getContext("2d");

      chartInstance.current = new Chart(ctx, {
        type: "line",
        data: {
          labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          datasets: [
            {
              label: "Study Hours",
              data: [2, 3.5, 2.5, 4, 3, 5, 2.5],
              borderColor: "rgb(147, 51, 234)",
              backgroundColor: "rgba(147, 51, 234, 0.1)",
              borderWidth: 2,
              fill: true,
              tension: 0.4,
              pointBackgroundColor: "rgb(147, 51, 234)",
              pointBorderColor: "#fff",
              pointBorderWidth: 2,
              pointRadius: 5,
              pointHoverRadius: 7,
            },
            {
              label: "Target Hours",
              data: [3, 3, 3, 3, 3, 3, 3],
              borderColor: "rgb(59, 130, 246)",
              borderWidth: 2,
              borderDash: [5, 5],
              fill: false,
              tension: 0.4,
              pointRadius: 0,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            legend: {
              display: true,
              position: "top",
              labels: {
                usePointStyle: true,
                padding: 10,
                font: {
                  size: 10,
                  weight: 500,
                },
              },
            },
            tooltip: {
              mode: "index",
              intersect: false,
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              padding: 8,
              titleFont: { size: 11, weight: "bold" },
              bodyFont: { size: 10 },
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              max: 6,
              grid: {
                color: "rgba(0, 0, 0, 0.05)",
              },
              ticks: {
                callback: function (value) {
                  return value + "h";
                },
                font: {
                  size: 10,
                },
              },
            },
            x: {
              grid: {
                display: false,
              },
              ticks: {
                font: {
                  size: 10,
                },
              },
            },
          },
        },
      });
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
        chartInstance.current = null;
      }
    };
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-md p-3">
      <h2 className="text-sm font-bold text-gray-900 mb-2">
        📊 Weekly Progress
      </h2>
      <div className="relative h-40">
        <canvas ref={chartRef}></canvas>
      </div>
      <div className="mt-2 grid grid-cols-3 gap-2 text-center text-xs">
        <div>
          <p className="text-gray-600">This Week</p>
          <p className="font-bold text-purple-600">22.5h</p>
        </div>
        <div>
          <p className="text-gray-600">Target</p>
          <p className="font-bold text-blue-600">21h</p>
        </div>
        <div>
          <p className="text-gray-600">Status</p>
          <p className="font-bold text-green-600">+1.5h ✅</p>
        </div>
      </div>
    </div>
  );
}
