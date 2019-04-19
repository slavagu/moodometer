import React, { Component } from 'react'
import './App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>How do you feel today?</p>
          <div>
            <button className="btn btn-danger btn-lg">
              bad <i className="fa fa-thumbs-down" />
            </button>
            <button className="btn btn-warning btn-lg m-3">
              meh <i className="fa fa-meh-o" />
            </button>
            <button className="btn btn-success btn-lg">
              fine <i className="fa fa-thumbs-up" />
            </button>
          </div>
        </header>
      </div>
    )
  }
}

export default App
