import React from 'react';

interface HeaderProps {
  currentTime: Date;
}

const Header: React.FC<HeaderProps> = ({ currentTime }) => {
  return (
    <header className="bg-white/5 backdrop-blur-lg border-b border-white/10 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-to-r from-amber-400 to-orange-500 p-3 rounded-xl shadow-lg">
              <i className="fas fa-seedling text-white text-xl"></i>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Onion Storage Monitoring</h1>
              <p className="text-gray-400 text-sm">Real-time agricultural storage management</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="text-right">
              <div className="text-white font-semibold">
                {currentTime.toLocaleTimeString()}
              </div>
              <div className="text-gray-400 text-sm">
                {currentTime.toLocaleDateString()}
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-400 text-sm font-medium">Live</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;