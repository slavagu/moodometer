import React, { useState } from 'react'
import TodayChart from '../components/TodayChart'
import MOOD from '../assets/mood'

const Options = ({ onSelect }) => (
  <div>
    {MOOD.options.map((o) => (
      <button
        key={o.id}
        className={`btn ${o.button} btn-xl m-2`}
        onClick={() => onSelect(o.id)}
      >
        {o.label}
      </button>
    ))}
  </div>
)

const defaultMood = Object.assign(
  {},
  ...MOOD.options.map((o) => ({ [o.id]: 0 }))
)

const Demo = () => {
  const [mood, setMood] = useState(defaultMood)

  const selectMood = async (moodId) => {
    const userMood = { ...mood }
    userMood[moodId]++
    setMood(userMood)
  }

  return (
    <div className="app-content">
      <p>{MOOD.question}</p>
      <Options onSelect={selectMood} />
      <div className="mt-4">
        <TodayChart mood={mood} />
      </div>
    </div>
  )
}

export default Demo
