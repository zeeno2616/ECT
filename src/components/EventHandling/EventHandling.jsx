"use client"

import { useState } from "react"
import PropTypes from "prop-types"
import styles from "./EventHandling.module.css"

export default function EventHandling({ onEventOccurred }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [eventDetails, setEventDetails] = useState(null)

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = Math.round(e.clientX - rect.left)
    const y = Math.round(e.clientY - rect.top)

    setMousePosition({ x, y })
    onEventOccurred("Mouse move")

    setEventDetails({
      type: e.type,
      target: e.currentTarget.className,
      timestamp: new Date().toLocaleTimeString(),
      clientX: e.clientX,
      clientY: e.clientY,
      offsetX: x,
      offsetY: y,
    })
  }

  const handleMouseEnter = (e) => {
    onEventOccurred("Mouse enter")

    setEventDetails({
      type: e.type,
      target: e.currentTarget.className,
      timestamp: new Date().toLocaleTimeString(),
    })
  }

  const handleMouseLeave = (e) => {
    onEventOccurred("Mouse leave")

    setEventDetails({
      type: e.type,
      target: e.currentTarget.className,
      timestamp: new Date().toLocaleTimeString(),
    })
  }

  return (
    <div className={styles.container}>
      <h2>Event Handling in React</h2>

      <div className={styles.section}>
        <h3>Mouse Events</h3>
        <div
          className={styles.mouseArea}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          Move your mouse here
          <div className={styles.coordinates}>
            X: {mousePosition.x}, Y: {mousePosition.y}
          </div>
        </div>
      </div>

      {eventDetails && (
        <div className={styles.eventDetails}>
          <h3>Last Event Details</h3>
          <pre>{JSON.stringify(eventDetails, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}

EventHandling.propTypes = {
  onEventOccurred: PropTypes.func,
}

EventHandling.defaultProps = {
  onEventOccurred: () => {},
}
