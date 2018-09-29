import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import Checkbox from 'material-ui/Checkbox';

export  default class MultiplyAct extends Component {
  static propTypes = {
    isSelectedInFilter: PropTypes.bool,
    isSelectedAll : PropTypes.bool,
    multiplyDeleteTask : PropTypes.func.isRequired,
    toggleSelect : PropTypes.func.isRequired
  }

  static defaultProps = {
    isSelectedAll: false,
    isSelectedInFilter : false
  }

  multiplyDeleterTask = () => {
    this.props.multiplyDeleteTask();
  }

  toggleSelect = (event, isInputChecked) => {
    this.props.toggleSelect(isInputChecked);

  }


  render() {
    const {
      isSelectedInFilter,
      isSelectedAll,
    } = this.props;
    const isChecked = isSelectedAll && isSelectedInFilter;

    return (
      <div>
        <Checkbox
        checked = {isChecked}
        label = {isChecked ? "Убрать все" : "Выбрать все"}
        onCheck = {this.toggleSelect}/>

        <IconButton disabled={!isSelectedInFilter} />
          <ActionDelete onClick = {this.multiplyDeleterTask} color = {isSelectedInFilter ? "black" : "grey" }/>
        <IconButton/>
      </div>
    )
  }
}
