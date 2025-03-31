"use client"

import { useState, useEffect } from "react"
import PropTypes from "prop-types"
import styles from "./SlotMachine.module.css"

// Import confetti dynamically to avoid SSR issues
let confetti
import("canvas-confetti").then((module) => {
  confetti = module.default
})

// Array of emojis for the slot machine
const emojis = ["🍎", "🍋", "🍒", "🍇", "🍉", "🍓", "🍌", "🍍", "🥝"]

export default function SlotMachine({ initialPoints, onPointsChange, spinCost, winReward }) {
  const [slots, setSlots] = useState(["❓", "❓", "❓"])
  const [isSpinning, setIsSpinning] = useState(false)
  const [isWinner, setIsWinner] = useState(false)
  const [points, setPoints] = useState(initialPoints)
  const [message, setMessage] = useState(null)

  // Update points when initialPoints prop changes
  useEffect(() => {
    setPoints(initialPoints)
  }, [initialPoints])

  // Update parent component when points change
  useEffect(() => {
    onPointsChange(points)
  }, [points, onPointsChange])

  // Function to get a random emoji
  const getRandomEmoji = () => {
    return emojis[Math.floor(Math.random() * emojis.length)]
  }

  // Function to spin the slot machine
  const spin = () => {
    // Check if player has enough points
    if (points < spinCost) {
      setMessage("Not enough points to spin!")
      return
    }

    // Deduct points for spinning
    setPoints((prevPoints) => prevPoints - spinCost)
    setMessage(null)
    setIsSpinning(true)
    setIsWinner(false)

    // Simulate spinning animation
    let spinCount = 0
    const maxSpins = 10
    const spinInterval = setInterval(() => {
      setSlots([getRandomEmoji(), getRandomEmoji(), getRandomEmoji()])
      spinCount++

      if (spinCount >= maxSpins) {
        clearInterval(spinInterval)
        const finalSlots = [getRandomEmoji(), getRandomEmoji(), getRandomEmoji()]
        setSlots(finalSlots)
        setIsSpinning(false)

        // Check if all slots match
        if (finalSlots[0] === finalSlots[1] && finalSlots[1] === finalSlots[2]) {
          setIsWinner(true)
          // Award points for winning
          setPoints((prevPoints) => prevPoints + winReward)
          setMessage(`You won ${winReward} points!`)
          // Trigger confetti effect for winners
          if (confetti) {
            confetti({
              particleCount: 100,
              spread: 70,
              origin: { y: 0.6 },
            })
          }
        }
      }
    }, 100)
  }

  // Reset the game
  const resetGame = () => {
    const resetPoints = 50
    setPoints(resetPoints)
    setSlots(["❓", "❓", "❓"])
    setIsWinner(false)
    setMessage(null)
  }

  return (
    <div className={styles.container}>
      <h2>Slot Machine</h2>

      <div className={styles.pointsDisplay}>
        <div className={styles.points}>
          <span>Points:</span> {points}
        </div>
        <div className={styles.info}>
          Spin Cost: {spinCost} | Win: +{winReward}
        </div>
      </div>

      <div className={styles.slots}>
        {slots.map((emoji, index) => (
          <div key={index} className={styles.slot}>
            {emoji}
          </div>
        ))}
      </div>

      {isWinner && <div className={styles.winnerMessage}>🎉 You Win! 🎉</div>}

      {message && <div className={`${styles.message} ${isWinner ? styles.success : styles.error}`}>{message}</div>}

      <div className={styles.actions}>
        <button onClick={spin} disabled={isSpinning || points < spinCost} className={styles.spinButton}>
          {isSpinning ? "Spinning..." : "Spin"}
        </button>

        {points < spinCost && (
          <button onClick={resetGame} className={styles.resetButton}>
            Reset Game
          </button>
        )}
      </div>
    </div>
  )
}

SlotMachine.propTypes = {
  initialPoints: PropTypes.number,
  onPointsChange: PropTypes.func,
  spinCost: PropTypes.number,
  winReward: PropTypes.number,
}

SlotMachine.defaultProps = {
  initialPoints: 50,
  onPointsChange: () => {},
  spinCost: 5,
  winReward: 20,
}

