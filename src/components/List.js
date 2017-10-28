import React, { Component } from 'react';
import Li from './Li';

class List extends Component {

  static defaultProps = {
    tasks : [],
  }

  constructor (props) {
    super (props);
    this.state = { tasks : props.tasks} ;
  }

  handleClick =  (idx) => {
    let tasks_ = this.state.tasks;

    tasks_[idx].isdone = ! tasks_[idx].isdone;
    this.setState ({ tasks: tasks_ });
  }

  render() {
      let cat = this.state.tasks;
      let handleClick = this.handleClick;
      return (
        <ul>{ (this.props.tasks.length > 0) ?
             cat.map ( function (task, i) {
                 return ( <Li  index = {i}
                               isdone = {task.isdone}
                               title = {task.title}
                               handleClick = { handleClick } />)
            }) : "Лежать + сосать"
              }
        </ul>
      )
  }
}
export default List;
