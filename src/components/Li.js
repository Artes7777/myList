import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IconunDone from 'material-ui/svg-icons/content/clear';
import IconDone from 'material-ui/svg-icons/action/done';
import IconDelete from 'material-ui/svg-icons/navigation/cancel';
import IconImidiate from 'material-ui/svg-icons/social/whatshot';
import IconMiddle from 'material-ui/svg-icons/places/spa';
import IconNormal from 'material-ui/svg-icons/social/mood';
import IconClosedMenu from 'material-ui/svg-icons/navigation/menu';
import IconOpenedMenu from 'material-ui/svg-icons/av/equalizer'
import {ListItem} from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import {numberValue} from '../consts';

export default class Li extends Component {
  constructor (props) {
    super (props);
    this.state = {
      isMenuBtnSelected : false,
  };
}

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

  ToggleBtnStatus(e){
   e.preventDefault();
   this.setState({isMenuBtnSelected: !this.state.isMenuBtnSelected})
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
        {this.state.isMenuBtnSelected &&
        <div className = "RenderBts">
          <IconImidiate value ="middle"  onClick = {this.addNumberVal(numberValue.immediately)} style = {btnStyle}/>
          <IconMiddle value ="middle"  onClick = {this.addNumberVal(numberValue.middle)} style = {btnStyle}/>
          <IconNormal value ="normal"  onClick = {this.addNumberVal(numberValue.normal)} style = {btnStyle}/>
        </div>
        }
        {this.state.isMenuBtnSelected ? <IconOpenedMenu onClick = {this.ToggleBtnStatus.bind(this)} style = {btnStyle}/> :
          <IconClosedMenu onClick = {this.ToggleBtnStatus.bind(this)} style = {btnStyle}/>
        }
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
      fontStyle: (numberValue) === 3 ? "italic" : (numberValue === 2) ? "italic" : "normal",
      fontWeight: (numberValue) === 3 ? "bold": "normal",
    };

    return (
      <ListItem
        primaryText = { <div>
                          <div className = "LiContainer" >
                            <Checkbox checked = {checked}
                            label = {<div style = {taskStyles}>{title}</div>}
                            onCheck = {this.checkList}
                            className = "Checkbox"
                            iconStyle= {(numberValue === 3) ? {fill: 'red'} :
                                       (numberValue === 2) ? {fill: 'orange'} :
                                       {fill: 'grey'}}/>

                            {this.renderBtns()}
                          </div>
                            {this.getTimeText()}
                        </div>
                      }
      />
    )
  }
}
