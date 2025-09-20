import React, { useState, useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import 'chartjs-adapter-date-fns';
import Header from './Header';
import MetricCard from './MetricCard';
import StatusBanner from './StatusBanner';
import FanControl from './FanControl';
import AlertSystem from './AlertSystem';
import ReportsPanel from './ReportsPanel';
import ChartContainer from './ChartContainer';

Chart.register(...registerables);

interface DataPoint {
  time: Date;
  temperature: number;
  humidity: number;
}

const Dashboard: React.FC = () => {
  const [temperature, setTemperature] = useState<number>(28.5);
  const [humidity, setHumidity] = useState<number>(65);
  const [fanStatus, setFanStatus] = useState<boolean>(false);
  const [data, setData] = useState<DataPoint[]>([]);
  const [alertLevel, setAlertLevel] = useState<'safe' | 'warning' | 'critical'>('safe');
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [isSystemActive, setIsSystemActive] = useState<boolean>(true);

  // Simulation parameters
  const targetTemp = 25.0; // Optimal temperature for storage
  const targetHumidity = 60; // Optimal humidity for storage
  const tempDriftRate = 0.2;
  const humidityDriftRate = 0.8;

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Simulation logic
  useEffect(() => {
    if (!isSystemActive) return;

    const interval = setInterval(() => {
      setTemperature(prev => {
        let newTemp = prev;
        const tempDiff = targetTemp - prev;
        
        if (fanStatus) {
          // Fan is on - cooling effect
          newTemp = prev + tempDiff * 0.1 + (Math.random() - 0.5) * tempDriftRate;
        } else {
          // Fan is off - ambient warming
          newTemp = prev + 0.1 + (Math.random() - 0.5) * tempDriftRate;
        }
        
        return Math.max(20, Math.min(40, newTemp)); // Keep within reasonable bounds
      });

      setHumidity(prev => {
        let newHumidity = prev;
        const humidityDiff = targetHumidity - prev;
        
        if (fanStatus) {
          // Fan affects air circulation and humidity
          newHumidity = prev + humidityDiff * 0.05 + (Math.random() - 0.5) * humidityDriftRate;
        } else {
          newHumidity = prev + (Math.random() - 0.5) * humidityDriftRate;
        }
        
        return Math.max(40, Math.min(90, newHumidity)); // Keep within reasonable bounds
      });

      // Add data point for charts
      setData(prev => {
        const newData = [...prev, {
          time: new Date(),
          temperature,
          humidity
        }].slice(-50); // Keep last 50 points
        return newData;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [fanStatus, isSystemActive, temperature, humidity]);

  // Alert system logic
  useEffect(() => {
    if (temperature > 32 || humidity > 72) {
      setAlertLevel('critical');
    } else if ((temperature > 30 && temperature <= 32) || (humidity > 70 && humidity <= 72)) {
      setAlertLevel('warning');
    } else {
      setAlertLevel('safe');
    }
  }, [temperature, humidity]);

  const getStatusText = () => {
    switch (alertLevel) {
      case 'safe': return 'Optimal Storage Conditions';
      case 'warning': return 'Monitoring Required';
      case 'critical': return 'Immediate Action Required';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.02%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-20"></div>
      
      <div className="relative z-10">
        <Header currentTime={currentTime} />
        
        <main className="container mx-auto px-4 py-6 space-y-6">
          <StatusBanner alertLevel={alertLevel} statusText={getStatusText()} />
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3 space-y-6">
              {/* Metrics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <MetricCard
                  title="Temperature"
                  value={temperature.toFixed(1)}
                  unit="°C"
                  icon="fas fa-thermometer-half"
                  alertLevel={temperature > 32 ? 'critical' : (temperature > 30 && temperature <= 32) ? 'warning' : 'safe'}
                  target={targetTemp}
                />
                <MetricCard
                  title="Humidity"
                  value={humidity.toFixed(1)}
                  unit="%"
                  icon="fas fa-tint"
                  alertLevel={humidity > 72 ? 'critical' : (humidity > 70 && humidity <= 72) ? 'warning' : 'safe'}
                  target={targetHumidity}
                />
              </div>

              {/* Charts */}
              <ChartContainer data={data} />
            </div>

            <div className="space-y-6">
              {/* Fan Control */}
              <FanControl
                fanStatus={fanStatus}
                onToggle={() => setFanStatus(!fanStatus)}
                temperature={temperature}
              />
              
              {/* Alert System */}
              <AlertSystem
                alertLevel={alertLevel}
                temperature={temperature}
                humidity={humidity}
              />
              
              {/* System Control */}
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <h3 className="text-white font-semibold mb-4 flex items-center">
                  <i className="fas fa-cog mr-2 text-blue-400"></i>
                  System Control
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">System Status</span>
                    <button
                      onClick={() => setIsSystemActive(!isSystemActive)}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                        isSystemActive 
                          ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                          : 'bg-red-500/20 text-red-400 border border-red-500/30'
                      }`}
                    >
                      {isSystemActive ? 'Active' : 'Inactive'}
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Auto Fan Control</span>
                    <button
                      className="px-3 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-400 border border-blue-500/30"
                      onClick={() => {
                        if (temperature > 30) setFanStatus(true);
                        else if (temperature < 28) setFanStatus(false);
                      }}
                    >
                      Enable
                    </button>
                  </div>
                </div>
              </div>

              {/* Reports Panel */}
              <ReportsPanel data={data} temperature={temperature} humidity={humidity} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;