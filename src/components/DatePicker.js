import React, { Component } from 'react';
import DatePicker from 'react-date-picker';

export default class DatePick extends Component {
  state = {
    date: new Date(),
  }

  onChange = date => this.setState({ date })

  render() {
    const vp = {
      display : "flex",
      justifyContent :  this.props.isTaskEmpty ? "center" : "flex-end",
    }

    return (
      <div style = {vp}>
        <DatePicker
          onChange={this.onChange}
          value={this.state.date}
        />
      </div>
    );
  }
}
