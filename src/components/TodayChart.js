import React from 'react'
import { Doughnut } from 'react-chartjs-2'
import MOOD from '../assets/mood'

const TodayChart = ({ mood }) => (
  <Doughnut
    options={{ maintainAspectRatio: false, legend: false, rotation: 1.57 }}
    data={{
      labels: MOOD.options.map((o) => o.label),
      datasets: [
        {
          data: mood && MOOD.options.map((o) => mood[o.id]),
          backgroundColor: MOOD.options.map((o) => o.color),
        },
      ],
    }}
  />
)

export default TodayChart
