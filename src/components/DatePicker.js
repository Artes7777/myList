import React, { Component } from 'react';
import DatePicker from 'react-date-picker';
import Calendar from 'react-calendar';
import moment from 'moment';

export default class DatePick extends Component {

  renderDatePickers = () => {
    if (this.props.date === null && this.props.todayOrCalendar === "today") {
      return moment().format('D.MM.Y') + " - " + moment().add(6, 'days').format('D.MM.Y')
    }

    else if (this.props.todayOrCalendar === "calendar") {
      return  <Calendar
                 onChange={this.props.onChange}
                 value={this.props.date}
              />
    }

    else { return <DatePicker
        onChange={this.props.onChange}
        value={this.props.date}
      />
    }
}

  render() {
    const vp = {
      display : "flex",
      justifyContent : "center",
    }

    return (
      <div style = {vp}>
         {this.renderDatePickers()}
      </div>
    );
  }
}
