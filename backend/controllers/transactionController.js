const Transaction = require("../models/Transaction");

// @desc    Get all transactions for user
// @route   GET /api/v1/transactions
// @access  Private
const getTransactions = async (req, res) => {
  try {
    const { type, startDate, endDate } = req.query;
    const query = { user: req.user._id };

    if (type) query.type = type;
    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }

    const transactions = await Transaction.find(query).sort({ date: -1 });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get transaction statistics
// @route   GET /api/v1/transactions/stats
// @access  Private
const getStats = async (req, res) => {
  try {
    const userId = req.user._id;

    const stats = await Transaction.aggregate([
      { $match: { user: userId } },
      {
        $group: {
          _id: "$type",
          total: { $sum: "$amount" },
          count: { $sum: 1 },
        },
      },
    ]);

    const result = {
      totalIncome: 0,
      totalExpense: 0,
      incomeCount: 0,
      expenseCount: 0,
      balance: 0,
    };

    stats.forEach((stat) => {
      if (stat._id === "income") {
        result.totalIncome = stat.total;
        result.incomeCount = stat.count;
      } else if (stat._id === "expense") {
        result.totalExpense = stat.total;
        result.expenseCount = stat.count;
      }
    });

    result.balance = result.totalIncome - result.totalExpense;

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create transaction
// @route   POST /api/v1/transactions
// @access  Private
const createTransaction = async (req, res) => {
  try {
    const { type, amount, category, description, date } = req.body;

    if (!type || !amount || !category) {
      return res.status(400).json({ message: "Please provide all required fields" });
    }

    const transaction = await Transaction.create({
      user: req.user._id,
      type,
      amount,
      category,
      description,
      date: date || Date.now(),
    });

    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update transaction
// @route   PUT /api/v1/transactions/:id
// @access  Private
const updateTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    // Check ownership
    if (transaction.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const updated = await Transaction.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete transaction
// @route   DELETE /api/v1/transactions/:id
// @access  Private
const deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    // Check ownership
    if (transaction.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await Transaction.findByIdAndDelete(req.params.id);

    res.json({ message: "Transaction deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get category-wise breakdown
// @route   GET /api/v1/transactions/categories
// @access  Private
const getCategoryBreakdown = async (req, res) => {
  try {
    const { type } = req.query;
    const query = { user: req.user._id };
    if (type) query.type = type;

    const breakdown = await Transaction.aggregate([
      { $match: query },
      {
        $group: {
          _id: { category: "$category", type: "$type" },
          total: { $sum: "$amount" },
          count: { $sum: 1 },
        },
      },
      { $sort: { total: -1 } },
    ]);

    res.json(breakdown);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getTransactions,
  getStats,
  createTransaction,
  updateTransaction,
  deleteTransaction,
  getCategoryBreakdown,
};
