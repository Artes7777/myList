import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IconunDone from 'material-ui/svg-icons/content/clear';
import IconDone from 'material-ui/svg-icons/action/done';
import IconDelete from 'material-ui/svg-icons/navigation/cancel';
import {ListItem} from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';

export default class Li extends Component {

  static propTypes = {
    index : PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]).isRequired,
    isdone : PropTypes.bool,
    title : PropTypes.string,
    toggleTask :  PropTypes.func.isRequired,
    deleteTask : PropTypes.func.isRequired,
  }

  static defaultProps = {
    isdone : false,
    title : "Сделать что-то",
  }

  handleClick = () => {
    const {
      index,
      toggleTask
    } = this.props;
    toggleTask(index);
  }

  deleteTasker = () => {
    const {
      index,
      deleteTask
    } = this.props;
    deleteTask(index);
  }

  renderBtns = () => {
    const btnStyle = {
      verticalAlign : 'middle'
    };
    return (
      <span>
      {this.props.isdone ?
        <IconunDone onClick = {this.handleClick} style = {btnStyle} /> :
        <IconDone onClick = {this.handleClick} style = {btnStyle} />
      }
      <IconDelete onClick = {this.deleteTasker} style = {btnStyle} />
      </span>
    )
  }

  render() {
    const taskStyles = {
      textDecoration: this.props.isdone ? "line-through" : "none"
    };

    return (
      <ListItem
        leftIcon = {<Checkbox/>}
        primaryText = { <div>
                          <span style = {taskStyles}>{this.props.title}</span>
                          {this.renderBtns()}
                        </div>
                           }
      />
    )
  }
}
