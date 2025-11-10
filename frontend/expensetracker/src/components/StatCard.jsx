import React from 'react';

const StatCard = ({ title, amount, icon, bgColor = 'bg-white', textColor = 'text-gray-900' }) => {
  const formatAmount = (num) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(num);
  };

  return (
    <div className={`${bgColor} rounded-lg shadow p-6 border border-gray-200`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className={`text-2xl font-bold ${textColor}`}>{formatAmount(amount)}</p>
        </div>
        <div className="text-4xl">{icon}</div>
      </div>
    </div>
  );
};

export default StatCard;
