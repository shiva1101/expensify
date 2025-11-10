import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../../components/layouts/DashboardLayout';
import StatCard from '../../../components/StatCard';
import TransactionCard from '../../../components/TransactionCard';
import api from '../../../utils/api';
import { TRANSACTIONS } from '../../../utils/apipaths';

const Home = () => {
  const [stats, setStats] = useState({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
  });
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [statsRes, transactionsRes] = await Promise.all([
        api.get(TRANSACTIONS.stats),
        api.get(TRANSACTIONS.getAll),
      ]);
      setStats(statsRes.data);
      setRecentTransactions(transactionsRes.data.slice(0, 10));
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this transaction?')) return;
    try {
      await api.delete(TRANSACTIONS.delete(id));
      fetchData();
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">Loading...</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            title="Total Income"
            amount={stats.totalIncome}
            icon="💰"
            bgColor="bg-green-50"
            textColor="text-green-600"
          />
          <StatCard
            title="Total Expenses"
            amount={stats.totalExpense}
            icon="💸"
            bgColor="bg-red-50"
            textColor="text-red-600"
          />
          <StatCard
            title="Balance"
            amount={stats.balance}
            icon="💵"
            bgColor="bg-blue-50"
            textColor={stats.balance >= 0 ? 'text-blue-600' : 'text-red-600'}
          />
        </div>

        {/* Recent Transactions */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Transactions</h2>
          {recentTransactions.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <p className="text-gray-500">No transactions yet. Start by adding income or expenses!</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {recentTransactions.map((transaction) => (
                <TransactionCard
                  key={transaction._id}
                  transaction={transaction}
                  onEdit={() => {}}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Home;
