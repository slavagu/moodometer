import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Bar, Doughnut } from 'react-chartjs-2'
import { getMood, getHistory } from '../moodClient'
import MOOD from '../mood'

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

  componentDidMount() {
    this.refresh()
    setInterval(this.refresh, 60000)
  }

  refresh = async () => {
    const todayMood = await getMood()
    const history = await getHistory()
    this.setState({ todayMood, history })
  }

  render() {
    return (
      <div className="app">
        <header>
          <a href="https://github.com/slavagu/moodometer">moodometer</a>
        </header>
        <div className="app-content">
          <div>
            <Today mood={this.state.todayMood} />
          </div>
          <p className="font-weight-light text-muted">today</p>
          <div className="h-50">
            <Trend history={this.state.history} />
          </div>
        </div>
        <footer>
          <Link to="/vote">Home</Link>
        </footer>
      </div>
    )
  }
}

export default App
