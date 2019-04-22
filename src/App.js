import React, { Component } from 'react'
import './App.css'
import { Doughnut } from 'react-chartjs-2'
import { getMood, postMood } from './moodClient'

const VOTE = {
  question: 'How do you feel today?',
  options: [
    { id: 'red', label: 'so-so', button: 'btn-danger', color: '#dc3545' },
    { id: 'yellow', label: 'good', button: 'btn-warning', color: '#ffc107' },
    { id: 'green', label: 'great', button: 'btn-success', color: '#28a745' },
  ],
}

const getUserMood = voteId =>
  Object.assign({}, ...VOTE.options.map(o => ({ [o.id]: 0, [voteId]: 1 })))

const VoteOptions = ({ onSelect }) => (
  <div>
    {VOTE.options.map(o => (
      <button
        key={o.id}
        className={`btn ${o.button} btn-lg m-2`}
        onClick={() => onSelect(o.id)}
      >
        {o.label}
      </button>
    ))}
  </div>
)

const VoteResults = ({ mood }) => (
  <Doughnut
    height={120}
    options={{ maintainAspectRatio: false, legend: false, rotation: 1.57 }}
    data={{
      labels: VOTE.options.map(o => o.label),
      datasets: [
        {
          data: mood && VOTE.options.map(o => mood[o.id]),
          backgroundColor: VOTE.options.map(o => o.color),
        },
      ],
    }}
  />
)

class App extends Component {
  state = {
    teamMood: null,
  }

  async componentDidMount() {
    const teamMood = await getMood()
    this.setState({ teamMood })
  }

  renderUserVote = id => {
    const { teamMood } = this.state
    teamMood[id]++
    this.setState({ teamMood })
  }

  handleSelect = async id => {
    this.renderUserVote(id) // optional optimisation for faster user feedback
    const userMood = getUserMood(id)
    const teamMood = await postMood(userMood)
    this.setState({ teamMood })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>{VOTE.question}</p>
          <VoteOptions onSelect={this.handleSelect} />
          <div className="fixed-bottom">
            <VoteResults mood={this.state.teamMood} />
          </div>
        </header>
      </div>
    )
  }
}

export default App
