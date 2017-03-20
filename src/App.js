import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor() {
    super();
    this.parseEvents = this.parseEvents.bind(this);
  }

  fetchEvents() {
    fetch('https://api.eventable.com/v1/events/', {
      method: 'GET',
      headers: {
        'Authorization': 'Token 7761e7e3b25a1d6d315901fcd7180d971f77ea2e',
      }
    })
    .then((events) => {events.json().then(json => {
      this.parseEvents(json.results);
    });
  })
    .catch((err) => {debugger});
  }

  parseEvents(events) {
    events.forEach((event) => {
      console.log(event);
    });
  }

  sortEvents(sortingCategory) {

  }

  render() {
    this.fetchEvents();
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
          <p>yes</p>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
