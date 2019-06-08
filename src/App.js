import React from 'react'
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'
import Vote from './pages/Vote'
import Report from './pages/Report'

const App = () => (
  <HashRouter>
    <Switch>
      <Route exact path="/" component={Vote} />
      <Route path="/report" component={Report} />
      <Redirect from="*" to="/" />
    </Switch>
  </HashRouter>
)

export default App
