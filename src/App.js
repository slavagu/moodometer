import React, { Component } from 'react'
import { Bar, Doughnut } from 'react-chartjs-2'
import { getMood, postMood, getHistory } from './moodClient'

const MOOD = {
  question: 'How do you feel today?',
  options: [
    { id: 'red', label: 'bad', button: 'btn-danger', color: '#dc3545' },
    { id: 'yellow', label: 'normal', button: 'btn-warning', color: '#ffc107' },
    { id: 'green', label: 'great', button: 'btn-success', color: '#28a745' },
  ],
}

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

const Today = ({ mood }) => (
  <Doughnut
    options={{ maintainAspectRatio: false, legend: false, rotation: 1.57 }}
    data={{
      labels: MOOD.options.map(o => o.label),
      datasets: [
        {
          data: mood && MOOD.options.map(o => mood[o.id]),
          backgroundColor: MOOD.options.map(o => o.color),
        },
      ],
    }}
  />
)

const Trend = ({ history }) => {
  if (!history) return null

  const data = {
    labels: history.map(m => m.date),
    datasets: MOOD.options.map(o => ({
      label: o.label,
      type: 'line',
      data: history.map(m => m[o.id]),
      fill: false,
      borderColor: o.color,
      backgroundColor: o.color,
    })),
  }

  const options = {
    maintainAspectRatio: false,
    legend: false,
    scales: {
      yAxes: [
        {
          // stacked: true,
        },
      ],
    },
  }

  return <Bar data={data} options={options} height={200} />
}

class App extends Component {
  state = {
    history: null,
    todayMood: null,
  }

  async componentDidMount() {
    const todayMood = await getMood()
    const history = await getHistory()
    this.setState({ todayMood, history })
  }

  renderUserMood = id => {
    const { todayMood } = this.state
    todayMood[id]++
    this.setState({ todayMood })
  }

  handleSelect = async moodId => {
    this.renderUserMood(moodId) // optional optimisation for faster user feedback

    const userMood = Object.assign(
      {},
      ...MOOD.options.map(o => ({ [o.id]: 0, [moodId]: 1 }))
    )
    const todayMood = await postMood(userMood)
    this.setState({ todayMood })
  }

  render() {
    return (
      <div className="app">
        <header>
          <a href="https://github.com/slavagu/moodometer">moodometer</a>
        </header>
        <div className="app-content">
          {/* <Today mood={this.state.todayMood} /> */}
          <p>{MOOD.question}</p>
          <Options onSelect={this.handleSelect} />
        </div>
        <footer>
          <Trend history={this.state.history} />
        </footer>
      </div>
    )
  }
}

export default App
