import React from 'react'
import { Bar } from 'react-chartjs-2'
import { MOOD } from '../assets/mood'

const HistoryChart = ({ moodHistory }) => {
  if (!moodHistory) return null

  const data = {
    labels: moodHistory.map((m) => m.date),
    datasets: MOOD.options.map((o) => ({
      label: o.label,
      type: 'line',
      data: moodHistory.map((m) => m[o.id]),
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

export default HistoryChart
