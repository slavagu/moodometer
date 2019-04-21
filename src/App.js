import React, { Component } from 'react'
import './App.css'
import { Doughnut, Bar } from 'react-chartjs-2'

const labels = ['so-so', 'good', 'great']
const buttons = ['btn-danger', 'btn-warning', 'btn-success']
const colors = ['#EB3547', '#FFC03E', '#00A553']

const apiUrl = process.env.REACT_APP_API_URL

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
}

const postMood = async mood => {
  const response = await fetch('apiUrl', {
    method: 'POST',
    headers,
    body: JSON.stringify(mood),
  })
  const content = await response.json()
  console.log(content)
  return content
}

const getMood = async () => {
  const response = await fetch('https://httpbin.org/get', {
    headers: {
      Accept: 'application/json',
    },
  })
  const content = await response.json()
  console.log(content)
  return content
}

const Options = ({ onSelect }) => (
  <div>
    {buttons.map((btn, i) => (
      <button
        key={labels[i]}
        className={`btn ${btn} btn-lg m-2`}
        onClick={() => onSelect(i)}
      >
        {labels[i]}
      </button>
    ))}
  </div>
)

const Report = ({ answers }) => (
  <Doughnut
    height={120}
    options={{ maintainAspectRatio: false, legend: false, rotation: 1.57 }}
    data={{ labels, datasets: [{ data: answers, backgroundColor: colors }] }}
  />
)

const options = {
  responsive: true,
  tooltips: {
    mode: 'label',
  },
  elements: {
    line: {
      fill: false,
    },
  },
}

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Sales',
      type: 'line',
      data: [51, 65, 40, 49, 60, 37, 40],
      fill: false,
      borderColor: '#EC932F',
      backgroundColor: '#EC932F',
      // pointBorderColor: '#EC932F',
      // pointBackgroundColor: '#EC932F',
      // pointHoverBackgroundColor: '#EC932F',
      // pointHoverBorderColor: '#EC932F',
      // yAxisID: 'y-axis-2'
    },
    {
      type: 'line',
      label: 'Visitor',
      data: [200, 185, 590, 621, 250, 400, 95],
      fill: false,
      backgroundColor: '#71B37C',
      borderColor: '#71B37C',
      // hoverBackgroundColor: '#71B37C',
      // hoverBorderColor: '#71B37C',
      // yAxisID: 'y-axis-1'
    },
  ],
}

const Trend = ({ answers }) => (
  <Bar
    data={data}
    height={200}
    options={{
      maintainAspectRatio: false,
      legend: false,
      scales: {
        yAxes: [
          {
            // stacked: true,
          },
        ],
      },
    }}
  />
)

class App extends Component {
  state = {
    answers: [
      {
        date: '2019-04-21',
        red: 0,
        yellow: 0,
        green: 0,
      },
    ],
  }
  handleSelect = choice => {
    const answers = [...this.state.answers]
    answers[choice]++
    this.setState({ answers })
  }
  render() {
    return (
      <div className="App">
        <header className="App-header" style={{ paddingBottom: '250px' }}>
          <p>How do you feel today?</p>
          <Options onSelect={this.handleSelect} />
          <div className="fixed-bottom">
            {/* <Report answers={this.state.answers} /> */}
            <Trend answers={this.state.answers} />
          </div>
        </header>
      </div>
    )
  }
}

export default App
