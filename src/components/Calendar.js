import React, {Component} from "react";
import {connect} from "react-redux";
import {changeDateTasks} from '../store/date/actions';
import Calendar from 'react-calendar';


class MyCalendar extends Component {

  render() {
    return (
      <div>
        <Calendar
          onChange={this.props.changeDateTasks}
          value={this.props.date}
          className = "classCalendar"
        />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    date: state.date.date,
  }
}

const mapDispatchToProps = {
  changeDateTasks
}

export default connect(mapStateToProps, mapDispatchToProps)(MyCalendar);
