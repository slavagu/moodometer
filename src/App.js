import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import Vote from './pages/Vote'
import Report from './pages/Report'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Vote} />
      <Route path="/report" component={Report} />
      <Redirect from="*" to="/" />
    </Switch>
  </BrowserRouter>
)

export default App
