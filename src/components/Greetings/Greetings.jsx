"use client"

import { useState, useEffect } from "react"
import PropTypes from "prop-types"
import styles from "./Greetings.module.css"

export default function Greetings({ defaultGreeting, onGreetingChange }) {
  const [name, setName] = useState("")
  const [greeting, setGreeting] = useState("")

  // Update parent component when greeting changes
  useEffect(() => {
    if (greeting) {
      onGreetingChange(greeting)
    }
  }, [greeting, onGreetingChange])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (name.trim()) {
      setGreeting(`Welcome, ${name}`)
    } else {
      // Use default greeting if no name is entered
      setGreeting(defaultGreeting)
    }
  }

  // Reset the greeting
  const handleReset = () => {
    setName("")
    setGreeting("")
    onGreetingChange("")
  }

  return (
    <div className={styles.container}>
      <h2>Greetings</h2>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className={styles.input}
          />
          <button type="submit" className={styles.button}>
            Greet
          </button>
        </div>
      </form>

      {greeting && (
        <>
          <div className={styles.greetingCard}>
            <p>{greeting}</p>
          </div>
          <button onClick={handleReset} className={styles.resetButton}>
            Reset
          </button>
        </>
      )}
    </div>
  )
}

Greetings.propTypes = {
  defaultGreeting: PropTypes.string,
  onGreetingChange: PropTypes.func,
}

Greetings.defaultProps = {
  defaultGreeting: "Hello there!",
  onGreetingChange: () => {},
}

