import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {List} from 'material-ui/List';
import Li from './Li';

class MyList extends Component {

  static propTypes = {
    tasks :  PropTypes.arrayOf(PropTypes.object),
    deleteTask : PropTypes.func.isRequired,
    toggleTask : PropTypes.func.isRequired,
  }

  static defaultProps = {
    tasks : [],
  }

  render() {
    const {
      tasks,
      deleteTask,
      toggleTask,
    } = this.props;

    return (
      <List>{ (tasks.length > 0) ?
        tasks.map ( (task) => {

          const {
            id,
            isdone,
            title
          } = task;
          return (
            <Li
              key = {id}
              index = {id}
              isdone = {isdone}
              title = {title}
              deleteTask = {deleteTask}
              toggleTask = {toggleTask}
            />
          )
        }) : "Введите вашу задачу"
      }
      </List>
    )
  }
}
export default MyList;
