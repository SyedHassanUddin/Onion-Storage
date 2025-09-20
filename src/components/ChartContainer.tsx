import React, { useEffect, useRef } from 'react';
import { Chart, ChartConfiguration } from 'chart.js';

interface DataPoint {
  time: Date;
  temperature: number;
  humidity: number;
}

interface ChartContainerProps {
  data: DataPoint[];
}

const ChartContainer: React.FC<ChartContainerProps> = ({ data }) => {
  const tempChartRef = useRef<HTMLCanvasElement>(null);
  const humidityChartRef = useRef<HTMLCanvasElement>(null);
  const tempChartInstance = useRef<Chart | null>(null);
  const humidityChartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (!tempChartRef.current || !humidityChartRef.current) return;

    // Destroy existing charts
    if (tempChartInstance.current) {
      tempChartInstance.current.destroy();
    }
    if (humidityChartInstance.current) {
      humidityChartInstance.current.destroy();
    }

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        x: {
          type: 'time' as const,
          time: {
            displayFormats: {
              second: 'HH:mm:ss'
            }
          },
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          },
          ticks: {
            color: 'rgba(255, 255, 255, 0.7)'
          }
        },
        y: {
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          },
          ticks: {
            color: 'rgba(255, 255, 255, 0.7)'
          }
        }
      },
      elements: {
        point: {
          radius: 2,
          hoverRadius: 4
        },
        line: {
          tension: 0.4
        }
      }
    };

    // Temperature Chart
    const tempConfig: ChartConfiguration = {
      type: 'line',
      data: {
        datasets: [
          {
            label: 'Temperature',
            data: data.map(point => ({ x: point.time, y: point.temperature })),
            borderColor: 'rgb(59, 130, 246)',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            fill: true
          },
          {
            label: 'Target',
            data: data.map(point => ({ x: point.time, y: 3.0 })),
            borderColor: 'rgb(34, 197, 94)',
            borderDash: [5, 5],
            pointRadius: 0
          }
        ]
      },
      options: {
        ...chartOptions,
        scales: {
          ...chartOptions.scales,
          y: {
            ...chartOptions.scales.y,
            min: 0,
            max: 12,
            title: {
              display: true,
              text: 'Temperature (°C)',
              color: 'rgba(255, 255, 255, 0.7)'
            }
          }
        }
      }
    };

    // Humidity Chart
    const humidityConfig: ChartConfiguration = {
      type: 'line',
      data: {
        datasets: [
          {
            label: 'Humidity',
            data: data.map(point => ({ x: point.time, y: point.humidity })),
            borderColor: 'rgb(168, 85, 247)',
            backgroundColor: 'rgba(168, 85, 247, 0.1)',
            fill: true
          },
          {
            label: 'Target',
            data: data.map(point => ({ x: point.time, y: 65 })),
            borderColor: 'rgb(34, 197, 94)',
            borderDash: [5, 5],
            pointRadius: 0
          }
        ]
      },
      options: {
        ...chartOptions,
        scales: {
          ...chartOptions.scales,
          y: {
            ...chartOptions.scales.y,
            min: 40,
            max: 100,
            title: {
              display: true,
              text: 'Humidity (%)',
              color: 'rgba(255, 255, 255, 0.7)'
            }
          }
        }
      }
    };

    tempChartInstance.current = new Chart(tempChartRef.current, tempConfig);
    humidityChartInstance.current = new Chart(humidityChartRef.current, humidityConfig);

    return () => {
      if (tempChartInstance.current) {
        tempChartInstance.current.destroy();
      }
      if (humidityChartInstance.current) {
        humidityChartInstance.current.destroy();
      }
    };
  }, [data]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
        <h3 className="text-white font-semibold mb-4 flex items-center">
          <i className="fas fa-chart-line mr-2 text-blue-400"></i>
          Temperature Trend
        </h3>
        <div className="h-64">
          <canvas ref={tempChartRef}></canvas>
        </div>
      </div>

      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
        <h3 className="text-white font-semibold mb-4 flex items-center">
          <i className="fas fa-chart-area mr-2 text-purple-400"></i>
          Humidity Trend
        </h3>
        <div className="h-64">
          <canvas ref={humidityChartRef}></canvas>
        </div>
      </div>
    </div>
  );
};

export default ChartContainer;