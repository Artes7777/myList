import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Filters extends  Component {

  static propTypes = {
    setFilter : PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      filter : "all" //all, completed, incompleted
    }
  }

  selectFilter = (filter) => {
    return () => {
      this.setState( {filter : filter} );
      this.props.setFilter(filter);
    }
  }

  render() {

    const filter = this.state.filter;

    return (
      <div>
        <button disabled = {filter === "completed"} onClick = {this.selectFilter("completed")}>Завершенные</button>
        <button disabled = { filter === "incompleted"} onClick = {this.selectFilter("incompleted")}>Незавершенные</button>
        <button disabled = {filter === "all"} onClick = {this.selectFilter("all")}>Все</button>
      </div>
    )
  }
}
