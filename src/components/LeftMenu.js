import React, {Component} from 'react';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import {connect} from "react-redux";
import {showTodayTasks, setDailyTasks, setCalendarTasks, showWeekTasks} from '../store/date/actions';

 class LeftMenu extends Component {

  todayTasks = () => {
    this.props.showTodayTasks()
    this.props.setDailyTasks()
  }

  weekTasks = () => {
    this.props.showWeekTasks()
    this.props.setDailyTasks()
  }

  renderCalendar = () => {
    this.props.showTodayTasks()
    this.props.setCalendarTasks()
  }

  render() {
    const style = {
      display: 'inline-block',
      marginTop: '10px'
    };

    return (
      <div>
        <Paper style = {style}>
          <Menu>
            <MenuItem onClick = {this.todayTasks} primaryText="Сегодня" />
            <MenuItem onClick = {this.weekTasks} primaryText="На неделю" />
            <MenuItem onClick = {this.renderCalendar} primaryText="Календарь" />
            <MenuItem onClick ={this.props.logOut} primaryText="Выйти" />
          </Menu>
        </Paper>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    date: state.date.date,
  }
}

const mapDispatchToProps = {
  showTodayTasks,
  setDailyTasks,
  setCalendarTasks,
  showWeekTasks
}

export default connect(mapStateToProps, mapDispatchToProps)(LeftMenu)
