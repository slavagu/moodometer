import React from 'react'
import { useApi } from '../utils/useApi'
import Loading from '../components/Loading'
import TodayChart from '../components/TodayChart'
import HistoryChart from '../components/HistoryChart'
import { defaultMood } from '../assets/mood'

const apiUrl = process.env.REACT_APP_API_URL

const Trend = () => {
  const { isLoading, error, data } = useApi({ url: `${apiUrl}/history` })

  if (isLoading) {
    return <Loading />
  }

  if (error) {
    return <div>Oops... {error.message}</div>
  }

  const todayDate = new Date().toLocaleDateString('sv')
  const todayMood = data.find((i) => i.date === todayDate) || defaultMood

  return (
    <div className="app-content">
      <div>
        <TodayChart mood={todayMood} />
      </div>
      <p className="text-muted">today</p>
      <div className="h-50">
        <HistoryChart moodHistory={data} />
      </div>
    </div>
  )
}

export default Trend
