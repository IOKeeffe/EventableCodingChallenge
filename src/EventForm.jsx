import React, { Component } from 'react';

export default class EventForm extends Component {
  constructor(props) {
    super(props);
    // this.resetState();
    this.checkErrors = this.checkErrors.bind(this)
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
    debugger;
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
    this.setState({errors: newErrors});
  }

  submitForm(e) {
    e.preventDefault();
    this.checkErrors();
    if(this.state.errors.length > 0) {
      this.props.receiveErrors(this.state.errors);
    }
    else {
      this.props.receiveEvent(this.state);
      this.resetState();
    }
    this.setState({errors: []});
  }

  render() {
    return (
      <form onSubmit={this.submitForm}>
        <label>Title:
          <input type="text" onChange={this.update('title')} />
        </label>
        <label>Location:
          <input type="text" onChange={this.update('locations')} />
        </label>
        <label>Start Date:
          <input type="datetime-local" onChange={this.update('start_time')} />
        </label>
        <label>End Date:
          <input type="datetime-local" onChange={this.update('end_time')} />
        </label>
        <input type="submit" value="Submit Event" className="submit" />
      </form>
    )
  }
}
