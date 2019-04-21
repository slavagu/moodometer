import React, { Component } from 'react'
import './App.css'
import { Doughnut } from 'react-chartjs-2'

const MOOD = [
  { id: 'red', label: 'so-so', button: 'btn-danger', color: '#EB3547' },
  { id: 'yellow', label: 'good', button: 'btn-warning', color: '#FFC03E' },
  { id: 'green', label: 'great', button: 'btn-success', color: '#00A553' },
]

const apiUrl = process.env.REACT_APP_API_URL

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
}

const postMood = async mood => {
  try {
    console.log('Posting mood', mood)
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify(mood),
    })
    const content = await response.json()
    return content
  } catch (e) {
    console.error(e)
  }
}

const getMood = async () => {
  try {
    const response = await fetch(apiUrl, { headers })
    const content = await response.json()
    return content
  } catch (e) {
    console.error(e)
  }
}

const Options = ({ onSelect }) => (
  <div>
    {MOOD.map(m => (
      <button
        key={m.id}
        className={`btn ${m.button} btn-lg m-2`}
        onClick={() => onSelect(m.id)}
      >
        {m.label}
      </button>
    ))}
  </div>
)

const Chart = ({ mood }) => (
  <Doughnut
    height={120}
    options={{ maintainAspectRatio: false, legend: false, rotation: 1.57 }}
    data={{
      labels: MOOD.map(m => m.label),
      datasets: [
        {
          data: mood && [mood.red, mood.yellow, mood.green],
          backgroundColor: MOOD.map(m => m.color),
        },
      ],
    }}
  />
)

class App extends Component {
  state = {
    mood: null,
  }
  async componentDidMount() {
    const mood = await getMood()
    this.setState({ mood })
  }
  handleSelect = async moodId => {
    const mood = { red: 0, yellow: 0, green: 0 }
    mood[moodId] = 1
    const updatedMood = await postMood(mood)
    this.setState({ mood: updatedMood })
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>How do you feel today?</p>
          <Options onSelect={this.handleSelect} />
          <div className="fixed-bottom">
            <Chart mood={this.state.mood} />
          </div>
        </header>
      </div>
    )
  }
}

export default App
