import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import './App.css'
import { Container } from 'reactstrap'
import Loading from './components/Loading'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import Home from './views/Home'
import Demo from './views/Demo'
import Profile from './views/Profile'
import Trend from './views/Trend'
import { useAuth0 } from '@auth0/auth0-react'
import initFontAwesome from './utils/initFontAwesome'

initFontAwesome()

const App = () => {
  const { isLoading, error } = useAuth0()

  if (isLoading) {
    return <Loading />
  }

  if (error) {
    return <div>Oops... {error.message}</div>
  }

  return (
    <div className="app">
      <NavBar />
      <Container className="flex-grow-1 mt-5">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/demo" component={Demo} />
          <Route path="/trend" component={Trend} />
          <Route path="/profile" component={Profile} />
          <Redirect from="*" to="/" />
        </Switch>
      </Container>
      <Footer />
    </div>
  )
}

export default App
