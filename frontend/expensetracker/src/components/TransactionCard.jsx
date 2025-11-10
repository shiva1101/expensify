import React from 'react';
import { CATEGORY_COLORS } from '../utils/constants';

const TransactionCard = ({ transaction, onEdit, onDelete }) => {
  const formatAmount = (num) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(num);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const categoryColor = CATEGORY_COLORS[transaction.category] || 'bg-gray-100 text-gray-700';

  return (
    <div className="bg-white rounded-lg shadow p-4 border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${categoryColor}`}>
              {transaction.category}
            </span>
            <span className="text-xs text-gray-500">{formatDate(transaction.date)}</span>
          </div>
          {transaction.description && (
            <p className="text-sm text-gray-700 mb-2">{transaction.description}</p>
          )}
        </div>
        <div className="flex items-start gap-2 ml-4">
          <div className="text-right">
            <p
              className={`text-lg font-bold ${
                transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {transaction.type === 'income' ? '+' : '-'}
              {formatAmount(transaction.amount)}
            </p>
          </div>
        </div>
      </div>
      <div className="flex gap-2 mt-3 pt-3 border-t border-gray-100">
        <button
          onClick={() => onEdit(transaction)}
          className="text-xs text-blue-600 hover:text-blue-800 font-medium"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(transaction._id)}
          className="text-xs text-red-600 hover:text-red-800 font-medium"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TransactionCard;
