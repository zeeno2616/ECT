"use client"

import { useState, useEffect } from "react"
import PropTypes from "prop-types"
import styles from "./Counter.module.css"

export default function Counter({ initialValue, onCountChange, min, max }) {
  const [count, setCount] = useState(initialValue)

  // Update count when initialValue prop changes
  useEffect(() => {
    setCount(initialValue)
  }, [initialValue])

  // Update parent component when count changes
  useEffect(() => {
    onCountChange(count)
  }, [count, onCountChange])

  const increment = () => {
    if (max === undefined || count < max) {
      setCount((prevCount) => prevCount + 1)
    }
  }

  const decrement = () => {
    if (min === undefined || count > min) {
      setCount((prevCount) => prevCount - 1)
    }
  }

  // Reset the counter
  const resetCounter = () => {
    setCount(initialValue)
  }

  // Check if buttons should be disabled
  const isIncrementDisabled = max !== undefined && count >= max
  const isDecrementDisabled = min !== undefined && count <= min

  return (
    <div className={styles.container}>
      <h2>Counter</h2>

      <div className={styles.counterCard}>
        <div className={styles.count}>{count}</div>

        <div className={styles.buttons}>
          <button
            onClick={decrement}
            className={`${styles.button} ${styles.decrementButton}`}
            aria-label="Decrement"
            disabled={isDecrementDisabled}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <button
            onClick={increment}
            className={`${styles.button} ${styles.incrementButton}`}
            aria-label="Increment"
            disabled={isIncrementDisabled}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 5V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        <button onClick={resetCounter} className={styles.resetButton}>
          Reset
        </button>

        {(min !== undefined || max !== undefined) && (
          <div className={styles.limits}>
            {min !== undefined && <span>Min: {min}</span>}
            {max !== undefined && <span>Max: {max}</span>}
          </div>
        )}
      </div>
    </div>
  )
}

Counter.propTypes = {
  initialValue: PropTypes.number,
  onCountChange: PropTypes.func,
  min: PropTypes.number,
  max: PropTypes.number,
}

Counter.defaultProps = {
  initialValue: 0,
  onCountChange: () => {},
}

