import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

export default class Filters extends  Component {

  static propTypes = {
    filter : PropTypes.string,
    setFilter : PropTypes.func.isRequired
  }


  selectFilter = (event, value) => {
    this.props.setFilter(value);
  }

  render() {

    return (
      <RadioButtonGroup
        onChange = {this.selectFilter}
        name="filter"
        valueSelected = {this.props.filter}
        className = "filterContainer"
      >
        <RadioButton
          value="all"
          label="Все"
        />
        <RadioButton
          value="completed"
          label="Завершенные"
        />
        <RadioButton
          value="incompleted"
          label="Незавершенные"
        />
      </RadioButtonGroup>
    )
  }
}
