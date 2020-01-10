import React, { Component } from 'react';
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
import {connect} from "react-redux";
import {thunkCreatorDeleteTask, thunkCreatorToggleTask, thunkCreatorChangePriority, selectTask, validateChechbox} from '../store/app/actions'


class Li extends Component {

  static defaultProps = {
    isdone : false,
    title : "Сделать что-то",
    checked : false
  }


  checkList = (event, isInputChecked) => {
    const {
      id,
      selectTask,
   } = this.props;
    selectTask(id, isInputChecked);

  }

  addNumberVal = (priority) => {
   return () => {
    const {
      id,
      thunkCreatorChangePriority
    } = this.props;
   thunkCreatorChangePriority(id, priority);
   }
 }

  handleClick = () => {
    const {
      id,
      thunkCreatorToggleTask
    } = this.props;
    thunkCreatorToggleTask(id);
  }

  deleteTasker = () => {
    const {
      id,
      thunkCreatorDeleteTask
    } = this.props;
    thunkCreatorDeleteTask(id);
    this.props.validateChechbox()
  }

  renderBtns = () => {

    const styleBtn = {
      height : '30px',
      width : '30px'
    }

    return (
      <div className = "RenderBts">
        {this.props.isdone ?
          <IconunDone
            onClick = {this.handleClick}
            style = {styleBtn}
          /> :
          <IconDone
            onClick = {this.handleClick}
            style = {styleBtn}
          />
        }
        <IconDelete
          onClick = {this.deleteTasker}
          style = {styleBtn}
        />

        <IconMenu
          onRequestChange = {this.onKeyCloseMenu}
          menuStyle = { {width : "100px" } }

          iconButtonElement={<IconClosedMenu  style = {styleBtn}/>}
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
      numberValue,
      checked
    } = this.props;

    const taskStyles = {
      textDecoration: isdone ? "line-through" : "none",
      fontStyle: (numberValue) === 3 ? "italic" :  "normal",
      fontWeight: (numberValue) === 3 ? "bold": "normal",
}
    const checkboxStyle = {
      fill : (numberValue === 3) ? 'red' : (numberValue === 2) ? 'orange' : 'grey',
      display : "flex",
      alignSelf: "center",
    }

    return (
      <ListItem
        primaryText = { <div>
                          <div className = "LiContainer" >
                            <Checkbox checked = {checked}
                            label = {<div className = "LiText" style = {taskStyles}>{title}</div>}
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

const mapStateToProps = (state, ownProps) => {
  const task = state.tasks.tasks.find(task => task.id === ownProps.id)
  return {
    ...task,
    checked: state.tasks.selected.has(ownProps.id)
  }
}

const mapDispatchToProps = {
  thunkCreatorDeleteTask,
  thunkCreatorToggleTask,
  thunkCreatorChangePriority,
  selectTask,
  validateChechbox
}

export default connect(mapStateToProps, mapDispatchToProps)(Li)
