"use client"

import { useState } from "react"
import SlotMachine from "./components/SlotMachine/SlotMachine"
import Greetings from "./components/Greetings/Greetings"
import Counter from "./components/Counter/Counter"
import "./App.css"

function App() {
  const [activeTab, setActiveTab] = useState("slot-machine")
  const [points, setPoints] = useState(50)
  const [greeting, setGreeting] = useState("")
  const [count, setCount] = useState(0)

  // Handle points change from SlotMachine
  const handlePointsChange = (newPoints) => {
    setPoints(newPoints)
    console.log(`Points updated: ${newPoints}`)
  }

  // Handle greeting change from Greetings
  const handleGreetingChange = (newGreeting) => {
    setGreeting(newGreeting)
    console.log(`New greeting: ${newGreeting}`)
  }

  // Handle count change from Counter
  const handleCountChange = (newCount) => {
    setCount(newCount)
    console.log(`Count updated: ${newCount}`)
  }

  return (
    <div className="app-container">
      <header>
        <h1>React Components Demo</h1>
      </header>

      <div className="tabs">
        <button className={activeTab === "slot-machine" ? "active" : ""} onClick={() => setActiveTab("slot-machine")}>
          Slot Machine
        </button>
        <button className={activeTab === "greetings" ? "active" : ""} onClick={() => setActiveTab("greetings")}>
          Greetings
        </button>
        <button className={activeTab === "counter" ? "active" : ""} onClick={() => setActiveTab("counter")}>
          Counter
        </button>
      </div>

      <div className="content-container">
        {activeTab === "slot-machine" && (
          <SlotMachine initialPoints={points} onPointsChange={handlePointsChange} spinCost={5} winReward={20} />
        )}
        {activeTab === "greetings" && (
          <Greetings defaultGreeting="Hello there!" onGreetingChange={handleGreetingChange} />
        )}
        {activeTab === "counter" && (
          <Counter initialValue={count} onCountChange={handleCountChange} min={-10} max={10} />
        )}
      </div>

      <div className="state-display">
        <div>Current Points: {points}</div>
        <div>Current Greeting: {greeting || "No greeting yet"}</div>
        <div>Current Count: {count}</div>
      </div>
    </div>
  )
}

export default App

