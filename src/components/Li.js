import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IconMenu from 'material-ui/IconMenu';
import Divider from 'material-ui/Divider';
import IconunDone from 'material-ui/svg-icons/content/clear';
import IconDone from 'material-ui/svg-icons/action/done';
import IconDelete from 'material-ui/svg-icons/navigation/cancel';
import IconClosedMenu from 'material-ui/svg-icons/navigation/menu';
import {ListItem} from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import RedFlag from '../red-flag.svg';
import YellowFlag from '../yellow-flag.svg';
import GreyFlag from '../grey-flag.svg';
import {numberValue} from '../consts';

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

  addNumberVal = (priority) => {
   return () => {
    const {
      index,
      addNumberValue
    } = this.props;
   addNumberValue(index, priority);
   }
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

    return (
      <div className = "RenderBts">
        {this.props.isdone ?
          <IconunDone onClick = {this.handleClick}  /> :
        <IconDone onClick = {this.handleClick}  />
        }
        <IconDelete onClick = {this.deleteTasker} />


         <IconMenu
            onRequestChange = {this.onKeyCloseMenu}
            menuStyle = { {width : "100px" } }
            iconButtonElement={<IconClosedMenu/>}
            anchorOrigin={{horizontal: 'left', vertical: 'top'}}
            targetOrigin={{horizontal: 'left', vertical: 'top'}}
          >
          <div className = "flexString">Приоритет</div>
          <div className = "flexBtn">
            <img alt = "Очень важно" className = "flag"
              onClick = {this.addNumberVal(numberValue.immediately)} src = {RedFlag}/>
            <img alt = "Средне важно" className = "flag"
              onClick = {this.addNumberVal(numberValue.middle)}  src = {YellowFlag} />
            <img alt = "Менее важно" className = "flag"
              onClick = {this.addNumberVal(numberValue.normal)}  src = {GreyFlag} />
          </div>
            <Divider />
          <div className = "flexString">Напоминание</div>
          </IconMenu>


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
      checked,
      numberValue
    } = this.props;

    const taskStyles = {
      maxWidth : 580,
      wordWrap : "break-word",
      textDecoration: isdone ? "line-through" : "none",
      fontStyle: (numberValue) === 3 ? "italic" :  "normal",
      fontWeight: (numberValue) === 3 ? "bold": "normal",
    };

    const checkboxStyle = {
      fill : (numberValue === 3) ? 'red' : (numberValue === 2) ? 'orange' : 'grey',
      display : "flex",
      alignSelf: "center"
    }

    return (
      <ListItem
        primaryText = { <div>
                          <div className = "LiContainer" >
                            <Checkbox checked = {checked}
                            label = {<div style = {taskStyles}>{title}</div>}
                            onCheck = {this.checkList}
                            iconStyle= {checkboxStyle}/>

                            {this.renderBtns()}
                          </div>
                            {this.getTimeText()}
                        </div>
                      }
      />
    )
  }
}
