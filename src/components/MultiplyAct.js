import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import Checkbox from 'material-ui/Checkbox';
import {connect} from 'react-redux';
import {thunkCreatorDeleteTasks, multiplySelect, inputChecked, validateChechbox, multiplySelectTasks} from '../store/app/actions';
import {isTaskInFilter, isTaskInDate} from '../helpers';

 class MultiplyAct extends Component {
  static propTypes = {
    isSelectedInFilter: PropTypes.bool,
    isSelectedAll : PropTypes.bool,
  }

  multiplyDeleterTask = () => {
    const ids = this.props.selected;
    const filteredIds = new Set();
    this.props.tasks.forEach( (task) => {
      if (ids.has(task.id) && isTaskInFilter(task, this.props.filter) && isTaskInDate(task, this.props.date)) {
        filteredIds.add(task.id);
        ids.delete(task.id);
      }
    });
    this.props.thunkCreatorDeleteTasks(filteredIds);
    this.props.validateChechbox()
  }

  toggleSelect = (event, isInputChecked) => {
    this.props.multiplySelectTasks(isInputChecked);
  }

  isSelectedInFilter = () => {
    const ids = this.props.selected;
    return this.props.tasks.some( (task) => {
      return ids.has(task.id) && isTaskInFilter(task, this.props.filter) && isTaskInDate(task, this.props.date) ;
    });
  }


  render() {
    const checkboxStyle = {
      display : "flex",
      alignSelf: "center"
    }
    const isChecked = this.props.isSelectedAll && this.isSelectedInFilter();

    return (
      <div className = "btnAllDelete">

        <Checkbox
          checked = {isChecked}
          label = {<div className = "btnAll">{isChecked ? "Убрать все" : "Выбрать все"}</div>}
          iconStyle= {checkboxStyle}
          onCheck = {this.toggleSelect}
          style = {{fontSize: '20px'}}
          />

        <div className = "styleDelete">
          <IconButton disabled={!this.isSelectedInFilter()} />
            <ActionDelete
              onClick = {this.multiplyDeleterTask}
              color = {this.isSelectedInFilter() ? "black" : "grey" }
              style = {{height : '30px' , width : '30px'}}
            />
          <IconButton/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    selected: state.tasks.selected,
    isSelectedAll: state.tasks.isSelectedAll,
    tasks: state.tasks.tasks,
    filter: state.filter.filter,
    date: state.date.date,
  }
}

const mapDispatchToProps = {
  thunkCreatorDeleteTasks,
  multiplySelect,
  inputChecked,
  validateChechbox,
  multiplySelectTasks
}

export default connect(mapStateToProps, mapDispatchToProps)(MultiplyAct)
