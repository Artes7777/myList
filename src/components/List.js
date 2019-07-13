import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import _ from 'underscore';
import Divider from 'material-ui/Divider';
import {List} from 'material-ui/List';
import Li from './Li';

class MyList extends Component {

  static propTypes = {
    tasks :  PropTypes.arrayOf(PropTypes.object),
    deleteTask : PropTypes.func.isRequired,
    toggleTask : PropTypes.func.isRequired,
    selectTask : PropTypes.func.isRequired,
    selected : PropTypes.instanceOf(Set)
  }

  static defaultProps = {
    selected : new Set(),
    tasks : [],
  }

  groupTasks() {
    return _.chain(this.props.tasks)
      .sortBy( function(a) {return -a.numberValue } )
      .sortBy('onDateTask')
      .groupBy((task) => moment(task.onDateTask).format('D. MM. YYYY'))
      .value();
  }

  renderTasksGroup = (group, date) => {
    const {
      selected,
      deleteTask,
      toggleTask,
      selectTask,
      addNumberValue,
      priorityStatus
    } = this.props;

    return (
      <div key = {date} className = "taskStyle">
        <div className = "weekDateStyle">{this.props.date === null ? date : ""}</div>

        <Divider/>

        {
          _.map(group, (task) => {
            const {
              id,
              isdone,
              title,
              createdAt,
              updatedAt,
              numberValue,
              onDateTask,
            } = task;

            return (
              <Li
                key = {id}
                index = {id}
                isdone = {isdone}
                title = {title}
                createdAt = {createdAt}
                updatedAt = {updatedAt}
                checked = {selected.has(id)}
                deleteTask = {deleteTask}
                toggleTask = {toggleTask}
                selectTask = {selectTask}
                addNumberValue = {addNumberValue}
                numberValue = {numberValue}
                priorityStatus = {priorityStatus}
                onDateTask = {onDateTask}
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
export default MyList;
