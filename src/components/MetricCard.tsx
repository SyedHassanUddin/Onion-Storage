import React from 'react';

interface MetricCardProps {
  title: string;
  value: string;
  unit: string;
  icon: string;
  alertLevel: 'safe' | 'warning' | 'critical';
  target?: number;
}

const MetricCard: React.FC<MetricCardProps> = ({ 
  title, 
  value, 
  unit, 
  icon, 
  alertLevel, 
  target 
}) => {
  const getColorClasses = () => {
    switch (alertLevel) {
      case 'critical': return 'border-red-500/30 bg-red-500/5';
      case 'warning': return 'border-yellow-500/30 bg-yellow-500/5';
      case 'safe': return 'border-green-500/30 bg-green-500/5';
    }
  };

  const getIconColor = () => {
    switch (alertLevel) {
      case 'critical': return 'text-red-400';
      case 'warning': return 'text-yellow-400';
      case 'safe': return 'text-green-400';
    }
  };

  return (
    <div className={`bg-white/10 backdrop-blur-lg rounded-2xl p-6 border transition-all duration-300 hover:scale-105 hover:bg-white/15 ${getColorClasses()}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-300 font-medium">{title}</h3>
        <i className={`${icon} text-xl ${getIconColor()}`}></i>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-baseline space-x-2">
          <span className="text-3xl font-bold text-white">{value}</span>
          <span className="text-gray-400 text-lg">{unit}</span>
        </div>
        
        {target && (
          <div className="text-sm text-gray-400">
            Target: {target}{unit}
          </div>
        )}
        
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${
            alertLevel === 'critical' ? 'bg-red-400' :
            alertLevel === 'warning' ? 'bg-yellow-400' : 'bg-green-400'
          }`}></div>
          <span className={`text-xs font-medium ${
            alertLevel === 'critical' ? 'text-red-400' :
            alertLevel === 'warning' ? 'text-yellow-400' : 'text-green-400'
          }`}>
            {alertLevel === 'critical' ? 'Critical' :
             alertLevel === 'warning' ? 'Warning' : 'Optimal'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MetricCard;