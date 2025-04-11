"use client"

import { useState, useEffect } from "react"
import PropTypes from "prop-types"
import ExpenseList from "./ExpenseList"
import styles from "./ExpenseTracker.module.css"

// Local storage key for expenses
const STORAGE_KEY = "expenses_data"

export default function ExpenseTracker({ onExpensesChange }) {
  const [amount, setAmount] = useState("")
  const [category, setCategory] = useState("")
  const [localExpenses, setLocalExpenses] = useState([])
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [saveStatus, setSaveStatus] = useState("")

  // Load expenses from localStorage
  useEffect(() => {
    const loadExpenses = () => {
      setIsLoading(true)
      try {
        const storedExpenses = localStorage.getItem(STORAGE_KEY)
        if (storedExpenses) {
          const parsedExpenses = JSON.parse(storedExpenses)
          setLocalExpenses(parsedExpenses)
          onExpensesChange(parsedExpenses)
        }
      } catch (err) {
        console.error("Error loading expenses:", err)
        setError("Failed to load expenses data")
      } finally {
        setIsLoading(false)
      }
    }

    setTimeout(loadExpenses, 800)
  }, [onExpensesChange])

  useEffect(() => {
    const saveExpenses = () => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(localExpenses))
        setSaveStatus("Data saved successfully")
        setTimeout(() => setSaveStatus(""), 2000)
      } catch (err) {
        console.error("Error saving expenses:", err)
        setSaveStatus("Error saving data")
        setTimeout(() => setSaveStatus(""), 2000)
      }
    }

    if (!isLoading && localExpenses.length > 0) {
      saveExpenses()
    }
  }, [localExpenses, isLoading])

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      setError("Please enter a valid amount")
      return
    }

    if (!category.trim()) {
      setError("Please enter a category")
      return
    }

    const newExpense = {
      id: Date.now(),
      amount: Number(amount),
      category: category.trim(),
      date: new Date().toLocaleDateString(),
    }

    const updatedExpenses = [...localExpenses, newExpense]
    setLocalExpenses(updatedExpenses)
    onExpensesChange(updatedExpenses)

    // Reset form
    setAmount("")
    setCategory("")
    setError("")
  }

  const handleDelete = (id) => {
    const updatedExpenses = localExpenses.filter((expense) => expense.id !== id)
    setLocalExpenses(updatedExpenses)
    onExpensesChange(updatedExpenses)
  }

  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to clear all expenses?")) {
      setLocalExpenses([])
      onExpensesChange([])
      localStorage.removeItem(STORAGE_KEY)
      setSaveStatus("All data cleared")
      setTimeout(() => setSaveStatus(""), 2000)
    }
  }

  return (
    <div className={styles.container}>
      <h2>Expense Tracker</h2>
      <div className={styles.statusBar}>
        {isLoading ? (
          <div className={styles.loading}>Loading expenses...</div>
        ) : (
          <div className={styles.status}>
            {saveStatus && <span className={styles.saveStatus}>{saveStatus}</span>}
            <span>
              {localExpenses.length} {localExpenses.length === 1 ? "expense" : "expenses"} loaded from storage
            </span>
            {localExpenses.length > 0 && (
              <button onClick={handleClearAll} className={styles.clearButton}>
                Clear All
              </button>
            )}
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="amount">Amount ($)</label>
          <input
            id="amount"
            type="number"
            step="0.01"
            min="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className={styles.input}
            placeholder="0.00"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="category">Category</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={styles.select}
          >
            <option value="">Select category</option>
            <option value="Food">Food</option>
            <option value="Transportation">Transportation</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Utilities">Utilities</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <button type="submit" className={styles.addButton}>
          Add Expense
        </button>
      </form>

      {error && <div className={styles.error}>{error}</div>}

      {isLoading ? (
        <div className={styles.loadingContainer}>
          <div className={styles.spinner}></div>
          <p>Loading expenses...</p>
        </div>
      ) : (
        <ExpenseList expenses={localExpenses} onDelete={handleDelete} />
      )}
    </div>
  )
}

ExpenseTracker.propTypes = {
  onExpensesChange: PropTypes.func,
}

ExpenseTracker.defaultProps = {
  onExpensesChange: () => {},
}
