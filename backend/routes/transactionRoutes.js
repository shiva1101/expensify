const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  getTransactions,
  getStats,
  createTransaction,
  updateTransaction,
  deleteTransaction,
  getCategoryBreakdown,
} = require("../controllers/transactionController");

const router = express.Router();

// All routes are protected
router.use(protect);

router.route("/").get(getTransactions).post(createTransaction);
router.get("/stats", getStats);
router.get("/categories", getCategoryBreakdown);
router.route("/:id").put(updateTransaction).delete(deleteTransaction);

module.exports = router;
