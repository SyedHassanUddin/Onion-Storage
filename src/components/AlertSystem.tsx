import React from 'react';

interface AlertSystemProps {
  alertLevel: 'safe' | 'warning' | 'critical';
  temperature: number;
  humidity: number;
}

const AlertSystem: React.FC<AlertSystemProps> = ({ alertLevel, temperature, humidity }) => {
  const getAlerts = () => {
    const alerts = [];
    
    if (temperature > 8) {
      alerts.push({
        type: 'critical',
        icon: 'fas fa-thermometer-full',
        message: 'Temperature critically high',
        action: 'Activate cooling immediately'
      });
    } else if (temperature > 6) {
      alerts.push({
        type: 'warning',
        icon: 'fas fa-thermometer-half',
        message: 'Temperature elevated',
        action: 'Monitor closely'
      });
    }

    if (humidity > 90) {
      alerts.push({
        type: 'critical',
        icon: 'fas fa-tint',
        message: 'Humidity critically high',
        action: 'Improve ventilation'
      });
    } else if (humidity > 80) {
      alerts.push({
        type: 'warning',
        icon: 'fas fa-tint',
        message: 'Humidity elevated',
        action: 'Check ventilation'
      });
    }

    if (alerts.length === 0) {
      alerts.push({
        type: 'safe',
        icon: 'fas fa-shield-alt',
        message: 'All systems normal',
        action: 'Continue monitoring'
      });
    }

    return alerts;
  };

  const alerts = getAlerts();

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
      <h3 className="text-white font-semibold mb-4 flex items-center">
        <i className="fas fa-bell mr-2 text-yellow-400"></i>
        Alert System
      </h3>
      
      <div className="space-y-3">
        {alerts.map((alert, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg border transition-all duration-300 ${
              alert.type === 'critical'
                ? 'bg-red-500/10 border-red-500/30 text-red-100'
                : alert.type === 'warning'
                ? 'bg-yellow-500/10 border-yellow-500/30 text-yellow-100'
                : 'bg-green-500/10 border-green-500/30 text-green-100'
            }`}
          >
            <div className="flex items-start space-x-3">
              <i className={`${alert.icon} mt-1 ${
                alert.type === 'critical' ? 'text-red-400' :
                alert.type === 'warning' ? 'text-yellow-400' : 'text-green-400'
              }`}></i>
              <div className="flex-1">
                <div className="font-medium text-sm mb-1">{alert.message}</div>
                <div className="text-xs opacity-80">{alert.action}</div>
              </div>
              {alert.type === 'critical' && (
                <div className="animate-pulse">
                  <i className="fas fa-exclamation-triangle text-red-400"></i>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-white/10">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">System Health</span>
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${
              alertLevel === 'critical' ? 'bg-red-400 animate-pulse' :
              alertLevel === 'warning' ? 'bg-yellow-400' : 'bg-green-400'
            }`}></div>
            <span className={`font-medium ${
              alertLevel === 'critical' ? 'text-red-400' :
              alertLevel === 'warning' ? 'text-yellow-400' : 'text-green-400'
            }`}>
              {alertLevel === 'critical' ? 'Critical' :
               alertLevel === 'warning' ? 'Warning' : 'Healthy'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertSystem;