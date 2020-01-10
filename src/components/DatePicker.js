import React, { Component } from 'react';
import DatePicker from 'react-date-picker';
import moment from 'moment';
import {connect} from "react-redux";
import {changeDateTasks} from '../store/date/actions';

class DatePick extends Component {

  renderDatePickers = () => {
    if (this.props.date === null) {
      return moment().format('D.MM.Y') + " - " + moment().add(6, 'days').format('D.MM.Y')
    }
    else { return <DatePicker
        onChange={this.props.changeDateTasks}
        value={this.props.date}
      />
    }
}

  render() {
    return (
      <div className = "DatePick">
         {this.renderDatePickers()}
      </div>
    );
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

export default connect(mapStateToProps, mapDispatchToProps)(DatePick);
