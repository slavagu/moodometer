import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { postMood } from '../moodClient'
import MOOD from '../mood'

const Options = ({ onSelect }) => (
  <div>
    {MOOD.options.map(o => (
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

class Vote extends Component {
  handleSelect = async moodId => {
    const userMood = Object.assign(
      {},
      ...MOOD.options.map(o => ({ [o.id]: 0, [moodId]: 1 }))
    )
    await postMood(userMood)
  }

  render() {
    return (
      <div className="app">
        <header>
          <a href="https://github.com/slavagu/moodometer">moodometer</a>
        </header>
        <div className="app-content">
          <p>{MOOD.question}</p>
          <Options onSelect={this.handleSelect} />
        </div>
        <footer>
          <Link to="/report">Report</Link>
        </footer>
      </div>
    )
  }
}

export default Vote
