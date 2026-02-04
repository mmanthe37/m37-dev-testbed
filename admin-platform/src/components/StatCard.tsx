import React, { ReactNode } from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  color?: string;
}

export default function StatCard({ 
  title, 
  value, 
  icon, 
  trend, 
  trendValue,
  color = '#3b82f6'
}: StatCardProps) {
  const getTrendColor = () => {
    if (trend === 'up') return 'text-green-500';
    if (trend === 'down') return 'text-red-500';
    return 'text-gray-500';
  };

  const getTrendIcon = () => {
    if (trend === 'up') return '↗';
    if (trend === 'down') return '↘';
    return '→';
  };

  return (
    <div className="card hover-lift cursor-pointer">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-gray-400 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold text-white mt-2">{value}</p>
          {trendValue && (
            <p className={`text-sm mt-2 flex items-center ${getTrendColor()}`}>
              <span className="mr-1">{getTrendIcon()}</span>
              {trendValue}
            </p>
          )}
        </div>
        <div 
          className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl"
          style={{ backgroundColor: `${color}20` }}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}
