import React, { Component } from 'react';
import PropTypes from 'prop-types';
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

  render() {
    const {
      tasks,
      selected,
      deleteTask,
      toggleTask,
      selectTask,
      addNumberValue,
      priorityStatus
    } = this.props;

    return (
      <List>{ (tasks.length > 0) ?
        tasks
        .sort( (a, b) => b.numberValue - a.numberValue)
        .map ( (task) => {

          const {
            id,
            isdone,
            title,
            createdAt,
            updatedAt,
            numberValue,
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
            />
          )
        }) : "Введите вашу задачу"
      }
      </List>
    )
  }
}
export default MyList;
