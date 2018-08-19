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
    createdAt: PropTypes.number,
    updatedAt: PropTypes.number,
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
      <div>
      {this.props.isdone ?
        <IconunDone onClick = {this.handleClick} style = {btnStyle} /> :
        <IconDone onClick = {this.handleClick} style = {btnStyle} />
      }
      <IconDelete onClick = {this.deleteTasker} style = {btnStyle} />
      </div>
    )
  }

  formatTime = (date) => {
    return new Date(date).toLocaleString();
  }

  getTimeText = () => {
    const {
      isdone,
      createdAt,
      updatedAt,
    } = this.props;
    return isdone ? `Выполнено : ${this.formatTime(updatedAt)}` :
      `Создано : ${this.formatTime(createdAt)}`;
  }

  render() {
    const taskStyles = {
      maxWidth : 580,
      wordWrap : "break-word",
      textDecoration: this.props.isdone ? "line-through" : "none"
    };

    return (
      <ListItem
        primaryText = { <div><div className = "LiContainer" >
                          <div className = "LiCheckText">
                            <div><Checkbox className = "Checkbox"/></div>
                            <div style = {taskStyles}>{this.props.title}</div>

                          </div>
                          {this.renderBtns()}
                        </div>
                          {this.getTimeText()}</div>
                      }
      />
    )
  }
}
