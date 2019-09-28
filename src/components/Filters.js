import React, { Component } from 'react';
import {connect} from 'react-redux';
import {setFilterValue} from '../store/filter/actions';
import PropTypes from 'prop-types';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

 class Filters extends  Component {

  static propTypes = {
    filter : PropTypes.string,
  }


  selectFilter = (event, value) => {
    this.props.setFilterValue(value);
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

const mapStateToProps = state => {
  return {
    filter : state.filter.filter
  }
}

const mapDispatchToProps = {
 setFilterValue,
}

export default connect(mapStateToProps, mapDispatchToProps)(Filters)
