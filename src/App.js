import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import EventForm from './EventForm';
import moment from 'moment';
import merge from 'lodash/merge';

class App extends Component {

  constructor() {
    super();
    this.state = {sortingBy: 'date', errors: [], searchString: ''};
    this.parseEvents = this.parseEvents.bind(this);
    this.receiveEvent = this.receiveEvent.bind(this);
    this.receiveErrors = this.receiveErrors.bind(this);
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
    .catch((err) => {});
  }

  parseEvents(events) {
    let newEvents = [];
    events.forEach((event) => {
      this.momentifyEvent(event);
      newEvents.push(event);
    });
    this.setState({events: newEvents});
  }

  momentifyEvent(event) {
    event.start_time = moment(event.start_time);
    event.end_time = moment(event.end_time);
  }

  sortEvents(sortingCategory, e) {
    if(e) e.preventDefault();
    let newEventsState = this.state.events.sort((ev1, ev2) => {
      if(sortingCategory === 'title') {
        this.setState({sortingBy: 'title'});
        if(ev1.title > ev2.title) return 1;
        if(ev2.title > ev1.title) return -1;
      }
      else if(sortingCategory === 'date') {
        this.setState({sortingBy: 'date'});
        if(ev1.start_time > ev2.start_time) return 1;
        if(ev2.start_time > ev1.start_time) return -1;
      }
      return 0;
    });
    this.setState({events: newEventsState});
  }

  receiveErrors(errors) {
    debugger;
    this.setState({errors: errors});
  }

  renderLocation(locations) {
    if(locations.length > 0) {
      return (<h4>Location: {locations[0].name}</h4>);
    }
  }

  receiveEvent(event) {
    Object.freeze(this.state);
    let newState = merge({}, this.state);
    this.momentifyEvent(event);
    newState.events.push(event);
    this.setState(newState);
    this.sortEvents(this.state.sortingBy)
  }

  renderErrors() {
    let errors = this.state.errors.map((error, i) => {
        return (
          <li className='Error-item' key={i}>
            <h3>{error}</h3>
          </li>
        );
      });
      return errors;
  }

  renderEvents() {
    let events = this.state.events.map((event, i) => {

      return (
        <li className='Event-item' key={i}>
          <h4>{event.title}</h4>
          <h4>Start Time: {this.stringifyMoment(event.start_time)}</h4>
          <h4>End Time: {this.stringifyMoment(event.end_time)}</h4>
          {this.renderLocation(event.locations)}
        </li>
      )
    })
    return events;
  }

  stringifyMoment(moment) {
    return moment.format('dddd, MMMM Do YYYY, h:mm:ss a');
  }

  render() {
    let nowString = moment().format('dddd, MMMM Do YYYY');
    if(this.state.events)
      return (
        <div className='App'>
          <div className='App-header'>
            <h3>
            {nowString}
            </h3>
            <h2>My Events</h2>
            <ul>
              {this.renderErrors()}
            </ul>
          </div>
          <div className='App-content'>
            <div className='Button-div'>
              <button onClick={(e) => this.sortEvents('title')}>Sort by Title</button>
              <button onClick={(e) => this.sortEvents('date')}>Sort by Date</button>
            </div>
            <EventForm receiveEvent={this.receiveEvent} receiveErrors={this.receiveErrors} />
            <ul className='Event-list'>
              {this.renderEvents()}
            </ul>
          </div>
        </div>
      );
    else {
      this.fetchEvents();
      return (
        <div>
          <img src={logo} className='App-logo' alt='Logo' />
        </div>
      )
    }
  }
}

export default App;
