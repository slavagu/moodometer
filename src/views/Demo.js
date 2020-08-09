import React, { useState } from 'react'
import Options from '../components/Options'
import TodayChart from '../components/TodayChart'
import HistoryChart from '../components/HistoryChart'
import { MOOD, defaultMood } from '../assets/mood'

class Simulation {
  constructor() {
    this.clickCount = 0
    this.day = new Date()
  }
  shouldAddNextDay = () => this.clickCount++ % 3 === 0
  getNextDay = () => {
    this.day.setDate(this.day.getDate() + 1)
    return this.day.toISOString().slice(0, 10)
  }
}

const simulation = new Simulation()

const defaultHistory = [
  { date: simulation.getNextDay(), red: 0, yellow: 0, green: 0 },
  { date: simulation.getNextDay(), red: 2, yellow: 1, green: 0 },
  { date: simulation.getNextDay(), red: 3, yellow: 2, green: 1 },
  { date: simulation.getNextDay(), red: 1, yellow: 1, green: 1 },
  { date: simulation.getNextDay(), red: 0, yellow: 1, green: 1 },
  { date: simulation.getNextDay(), red: 0, yellow: 1, green: 2 },
  { date: simulation.getNextDay(), red: 0, yellow: 1, green: 1 },
]

const Demo = () => {
  const [mood, setMood] = useState(defaultMood)
  const [history, setHistory] = useState(defaultHistory)

  const selectMood = async (moodId) => {
    const newMood = { ...mood }
    newMood[moodId]++
    setMood(newMood)

    const newHistory = [...history]
    if (simulation.shouldAddNextDay()) {
      newHistory.push({ ...defaultMood, date: simulation.getNextDay() })
    }
    newHistory[newHistory.length - 1][moodId]++
    setHistory(newHistory)
  }

  return (
    <div className="app-content">
      <p>DEMO</p>
      <p>{MOOD.question}</p>
      <Options onSelect={selectMood} />
      <div className="mt-4">
        <TodayChart mood={mood} />
      </div>
      <div className="h-50">
        <HistoryChart moodHistory={history} />
      </div>
    </div>
  )
}

export default Demo
