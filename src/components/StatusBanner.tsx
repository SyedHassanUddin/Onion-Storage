import React from 'react';

interface StatusBannerProps {
  alertLevel: 'safe' | 'warning' | 'critical';
  statusText: string;
}

const StatusBanner: React.FC<StatusBannerProps> = ({ alertLevel, statusText }) => {
  const getStyleClasses = () => {
    switch (alertLevel) {
      case 'critical':
        return 'bg-gradient-to-r from-red-600/20 to-red-500/20 border-red-500/30 text-red-100';
      case 'warning':
        return 'bg-gradient-to-r from-yellow-600/20 to-yellow-500/20 border-yellow-500/30 text-yellow-100';
      case 'safe':
        return 'bg-gradient-to-r from-green-600/20 to-green-500/20 border-green-500/30 text-green-100';
    }
  };

  const getIcon = () => {
    switch (alertLevel) {
      case 'critical': return 'fas fa-exclamation-triangle';
      case 'warning': return 'fas fa-exclamation-circle';
      case 'safe': return 'fas fa-check-circle';
    }
  };

  return (
    <div className={`rounded-2xl p-4 border backdrop-blur-lg transition-all duration-500 ${getStyleClasses()}`}>
      <div className="flex items-center justify-center space-x-3">
        <i className={`${getIcon()} text-xl`}></i>
        <span className="font-semibold text-lg">{statusText}</span>
        {alertLevel === 'critical' && (
          <div className="animate-pulse">
            <i className="fas fa-bell text-red-400"></i>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatusBanner;