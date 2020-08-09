import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Jumbotron } from 'reactstrap'
import { useAuth0 } from '@auth0/auth0-react'
import { useApi } from '../utils/useApi'
import Options from '../components/Options'
import Loading from '../components/Loading'
import { MOOD } from '../assets/mood'

const apiUrl = process.env.REACT_APP_API_URL

const Home = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0()

  if (!isAuthenticated) {
    return (
      <div className="app-content">
        <Jumbotron className="bg-dark">
          <h1>Welcome to Mood-o-Meter!</h1>
          <br />
          <p>
            Try the <Link to="/demo">demo</Link> or{' '}
            <Link to="" onClick={() => loginWithRedirect()}>
              log in
            </Link>{' '}
            to track your mood.
          </p>
        </Jumbotron>
      </div>
    )
  }

  const [mood, setMood] = useState(null)

  const { isLoading, error, refresh } = useApi({
    url: `${apiUrl}/mood`,
    options: {
      method: 'POST',
    },
    data: mood,
  })

  const selectMood = async (moodId) => {
    const userMood = Object.assign(
      {},
      ...MOOD.options.map((o) => ({ [o.id]: 0, [moodId]: 1 }))
    )
    setMood(userMood)
    refresh()
  }

  if (isLoading) {
    return <Loading />
  }

  if (error) {
    return <div>Oops... {error.message}</div>
  }

  return (
    <div className="app-content">
      <p>{MOOD.question}</p>
      <Options onSelect={selectMood} />
      <br />
      <br />
    </div>
  )
}

export default Home
