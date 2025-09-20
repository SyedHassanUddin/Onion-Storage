import React, { useMemo } from 'react';

interface DataPoint {
  time: Date;
  temperature: number;
  humidity: number;
}

interface ReportsPanelProps {
  data: DataPoint[];
  temperature: number;
  humidity: number;
}

const ReportsPanel: React.FC<ReportsPanelProps> = ({ data, temperature, humidity }) => {
  const stats = useMemo(() => {
    if (data.length === 0) return { avgTemp: 0, avgHumidity: 0, dataPoints: 0 };
    
    const avgTemp = data.reduce((sum, point) => sum + point.temperature, 0) / data.length;
    const avgHumidity = data.reduce((sum, point) => sum + point.humidity, 0) / data.length;
    
    return {
      avgTemp: avgTemp.toFixed(1),
      avgHumidity: avgHumidity.toFixed(1),
      dataPoints: data.length
    };
  }, [data]);

  const getStorageQuality = () => {
    if (temperature > 8 || humidity > 90) return { score: 'Poor', color: 'text-red-400' };
    if (temperature > 6 || humidity > 80) return { score: 'Fair', color: 'text-yellow-400' };
    if (temperature <= 4 && humidity <= 70) return { score: 'Excellent', color: 'text-green-400' };
    return { score: 'Good', color: 'text-blue-400' };
  };

  const storageQuality = getStorageQuality();

  const exportData = () => {
    const csvContent = "Time,Temperature,Humidity\n" + 
      data.map(point => `${point.time.toISOString()},${point.temperature},${point.humidity}`).join("\n");
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `onion-storage-data-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
      <h3 className="text-white font-semibold mb-4 flex items-center">
        <i className="fas fa-chart-bar mr-2 text-green-400"></i>
        Storage Reports
      </h3>
      
      <div className="space-y-4">
        <div className="bg-black/20 rounded-lg p-4 space-y-3">
          <h4 className="text-gray-300 font-medium text-sm">Session Statistics</h4>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">Avg Temperature</span>
              <span className="text-white font-medium">{stats.avgTemp}°C</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">Avg Humidity</span>
              <span className="text-white font-medium">{stats.avgHumidity}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">Data Points</span>
              <span className="text-white font-medium">{stats.dataPoints}</span>
            </div>
          </div>
        </div>

        <div className="bg-black/20 rounded-lg p-4">
          <h4 className="text-gray-300 font-medium text-sm mb-3">Storage Quality</h4>
          <div className="flex items-center justify-between">
            <span className="text-gray-400 text-sm">Overall Rating</span>
            <span className={`font-bold ${storageQuality.color}`}>
              {storageQuality.score}
            </span>
          </div>
          <div className="mt-2">
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-1000 ${
                  storageQuality.score === 'Excellent' ? 'bg-green-500 w-full' :
                  storageQuality.score === 'Good' ? 'bg-blue-500 w-3/4' :
                  storageQuality.score === 'Fair' ? 'bg-yellow-500 w-1/2' :
                  'bg-red-500 w-1/4'
                }`}
              ></div>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <button
            onClick={exportData}
            disabled={data.length === 0}
            className="w-full bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border border-blue-500/30 rounded-lg p-3 text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            <i className="fas fa-download"></i>
            <span>Export Data (CSV)</span>
          </button>
          
          <div className="text-xs text-gray-500 text-center">
            <i className="fas fa-info-circle mr-1"></i>
            Data updates every 2 seconds
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsPanel;