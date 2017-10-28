import React, { Component } from 'react';
export default class Li extends Component {
  handleClicker = () => {
    this.props.handleClick (this.props.index);
  }

  render() {
    let done = this.props.isdone;
    let taskStyles = {
      textDecoration: done ? "line-through" : "none"
    }

    return (
      <li>
        <input checked = {done}  type = "Checkbox"
         onClick = {this.handleClicker}/><span style = {taskStyles}>
         {this.props.title}</span>
      </li>
    )

  }
}
