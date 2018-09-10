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
    createdAt : PropTypes.number,
    updatedAt : PropTypes.number,
    checked : PropTypes.bool,
    toggleTask :  PropTypes.func.isRequired,
    deleteTask : PropTypes.func.isRequired,
    selectTask : PropTypes.func.isRequired,

  }

  static defaultProps = {
    isdone : false,
    title : "Сделать что-то",
    checked : false
  }

  checkList = (event, isInputChecked) => {
    const {
      index,
      selectTask,
   } = this.props;
    selectTask(index, isInputChecked);

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
      <div className = "RenderBts">
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
    const {
      isdone,
      title,
      checked
    } = this.props;

    const taskStyles = {
      maxWidth : 580,
      wordWrap : "break-word",
      textDecoration: isdone ? "line-through" : "none"
    };

    return (
      <ListItem
        primaryText = { <div>
                          <div className = "LiContainer" >
                            <Checkbox checked = {checked}
                            label = {<div style = {taskStyles}>{title}</div>}
                            onCheck = {this.checkList}
                            className = "Checkbox"
                            />

                            {this.renderBtns()}
                          </div>
                            {this.getTimeText()}
                        </div>
                      }
      />
    )
  }
}
