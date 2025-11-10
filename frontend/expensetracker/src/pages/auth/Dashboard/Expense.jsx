import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../../components/layouts/DashboardLayout';
import TransactionCard from '../../../components/TransactionCard';
import TransactionModal from '../../../components/TransactionModal';
import api from '../../../utils/api';
import { TRANSACTIONS } from '../../../utils/apipaths';
import { EXPENSE_CATEGORIES } from '../../../utils/constants';

const Expense = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const { data } = await api.get(`${TRANSACTIONS.getAll}?type=expense`);
      setTransactions(data);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      if (editingTransaction) {
        await api.put(TRANSACTIONS.update(editingTransaction._id), formData);
      } else {
        await api.post(TRANSACTIONS.create, formData);
      }
      fetchTransactions();
      setEditingTransaction(null);
    } catch (error) {
      console.error('Error saving expense:', error);
    }
  };

  const handleEdit = (transaction) => {
    setEditingTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this expense?')) return;
    try {
      await api.delete(TRANSACTIONS.delete(id));
      fetchTransactions();
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTransaction(null);
  };

  const totalExpense = transactions.reduce((sum, t) => sum + t.amount, 0);

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
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Expenses</h2>
            <p className="text-sm text-gray-600 mt-1">
              Total: ₹{totalExpense.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 font-medium"
          >
            + Add Expense
          </button>
        </div>

        {/* Transactions List */}
        {transactions.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-500">No expenses recorded yet. Click "Add Expense" to get started!</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {transactions.map((transaction) => (
              <TransactionCard
                key={transaction._id}
                transaction={transaction}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>

      <TransactionModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        transaction={editingTransaction}
        type="expense"
        categories={EXPENSE_CATEGORIES}
      />
    </DashboardLayout>
  );
};

export default Expense;
