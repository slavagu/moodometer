import React from 'react'
import ReactDOM from 'react-dom'
import Home from './Home'
import { BrowserRouter as Router } from 'react-router-dom'

it('renders', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <Router>
      <Home />
    </Router>,
    div
  )
})
