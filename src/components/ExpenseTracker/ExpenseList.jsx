"use client"

import PropTypes from "prop-types"
import styles from "./ExpenseTracker.module.css"

export default function ExpenseList({ expenses, onDelete }) {
  if (expenses.length === 0) {
    return <div className={styles.emptyState}>No expenses yet. Add one to get started!</div>
  }

  return (
    <div className={styles.expenseList}>
      <h3>Your Expenses</h3>

      <div className={styles.listHeader}>
        <span>Category</span>
        <span>Amount</span>
        <span>Date</span>
        <span>Action</span>
      </div>

      {expenses.map((expense) => (
        <div key={expense.id} className={styles.expenseItem}>
          <span className={styles.category}>{expense.category}</span>
          <span className={styles.amount}>${expense.amount.toFixed(2)}</span>
          <span className={styles.date}>{expense.date}</span>
          <button onClick={() => onDelete(expense.id)} className={styles.deleteButton} aria-label="Delete expense">
            ×
          </button>
        </div>
      ))}

      <div className={styles.total}>
        <span>Total</span>
        <span>${expenses.reduce((sum, expense) => sum + expense.amount, 0).toFixed(2)}</span>
      </div>
    </div>
  )
}

ExpenseList.propTypes = {
  expenses: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
}
