import React, { Component } from 'react';
import logo from './logo.svg';

export default class EventForm extends Component {
  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
  }

  resetState() {
    this.setState({errors: [], title: '', start_time: '', end_time: '', locations: ''});
  }
  componentDidMount() {
    this.resetState();
  }

  update(field) {
    return (e) => {
      if(field === 'locations') {
        this.setState({[field]: [e.target.value]});
      }
      else {
        this.setState({[field]: e.target.value});
      }
    }
  }

  checkErrors() {
    let newErrors = [];
    if(!this.state.title) {
      newErrors.push("Please add an event title.");
    }
    if(!this.state.start_time) {
      newErrors.push("Start time can't be blank.");
    }
    if(!this.state.end_time) {
      newErrors.push("End time can't be blank.");
    }
    if(this.state.start_time > this.state.end_time) {
      newErrors.push("Event can't end before it begins.");
    }
    return newErrors;
  }

  submitForm(e) {
    e.preventDefault();
    let errors = this.checkErrors();
    if(errors.length > 0) {
      this.props.receiveErrors(errors);
    }
    else {
      this.props.receiveEvent(this.state);
      this.resetState();
    }
  }

  render() {
    if(this.state) {
      return (
        <form onSubmit={this.submitForm}>
          <label>Title:
            <input type="text" value={this.state.title} onChange={this.update('title')} />
          </label>
          <label>Location:
            <input type="text" value={this.state.locations} onChange={this.update('locations')} />
          </label>
          <label>Start Date:
            <input type="datetime-local" value={this.state.start_date} onChange={this.update('start_time')} />
          </label>
          <label>End Date:
            <input type="datetime-local" value={this.state.end_date} onChange={this.update('end_time')} />
          </label>
          <input type="submit" value="Submit Event" className="submit" />
        </form>
      )
    }
    else {return (
      <div>
        <img src={logo} className='App-logo' alt='Logo' />
      </div>
    )}
  }
}
