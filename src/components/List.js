import React, { Component } from 'react';
import {connect} from "react-redux";
import moment from 'moment';
import _ from 'underscore';
import Divider from 'material-ui/Divider';
import {List} from 'material-ui/List';
import Li from './Li';
import {isTaskInFilter, isTaskInDate} from '../helpers';

class MyList extends Component {

  groupTasks() {
    return _.chain(this.props.tasks)
      .sortBy( function(a) {return -a.numberValue } )
      .sortBy('onDateTask')
      .groupBy((task) => moment(task.onDateTask).format('D. MM. YYYY'))
      .value();
  }

  renderTasksGroup = (group, date) => {

    return (
      <div key = {date} className = "taskStyle">
        <div className = "weekDateStyle">{this.props.date === null ? date : ""}</div>

        <Divider/>

        {
          _.map(group, (task) => {
            const {
              id,
            } = task;

            return (
              <Li
                key = {id}
                id = {id}
              />
            );
          })
        }
      </div>
    );
  }

  render() {
    const {tasks} = this.props;

    return tasks.length
      ? (
        <List>
          { _.map(this.groupTasks(), this.renderTasksGroup) }
        </List>
      )
      : "Список пуст";
  }
}

const mapStateToProps = (state) => {

  return {
    tasks : state.tasks.tasks.filter((task) => isTaskInFilter(task, state.filter.filter) && isTaskInDate(task, state.date.date)),
    date: state.date.date,
  }
}

export default connect(mapStateToProps)(MyList)
