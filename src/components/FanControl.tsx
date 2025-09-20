import React from 'react';

interface FanControlProps {
  fanStatus: boolean;
  onToggle: () => void;
  temperature: number;
}

const FanControl: React.FC<FanControlProps> = ({ fanStatus, onToggle, temperature }) => {
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
      <h3 className="text-white font-semibold mb-4 flex items-center">
        <i className="fas fa-fan mr-2 text-blue-400"></i>
        Fan Control System
      </h3>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-gray-300">Fan Status</span>
          <div className="flex items-center space-x-2">
            <span className={`text-sm font-medium ${fanStatus ? 'text-green-400' : 'text-gray-400'}`}>
              {fanStatus ? 'ON' : 'OFF'}
            </span>
            <button
              onClick={onToggle}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                fanStatus ? 'bg-blue-500' : 'bg-gray-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${
                  fanStatus ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        <div className="bg-black/20 rounded-lg p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-gray-400 text-sm">Current Temp</span>
            <span className="text-white font-medium">{temperature.toFixed(1)}°C</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-400 text-sm">Target Temp</span>
            <span className="text-blue-400 font-medium">3.0°C</span>
          </div>
        </div>

        <div className={`p-3 rounded-lg flex items-center space-x-2 ${
          fanStatus ? 'bg-blue-500/20 text-blue-400' : 'bg-gray-500/20 text-gray-400'
        }`}>
          <i className={`fas fa-fan ${fanStatus ? 'animate-spin' : ''}`}></i>
          <span className="text-sm">
            {fanStatus ? 'Cooling system active' : 'System in standby'}
          </span>
        </div>

        <div className="text-xs text-gray-500">
          <i className="fas fa-info-circle mr-1"></i>
          Fan automatically regulates temperature for optimal storage
        </div>
      </div>
    </div>
  );
};

export default FanControl;