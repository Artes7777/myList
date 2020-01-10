import CircularProgress from 'material-ui/CircularProgress';
import React, {Component} from "react";
import './App.css';

export default class Loader extends Component {

  render() {
    return (
      <div className = "loaderStyle">
        <CircularProgress size={80} thickness={5} color = "white" />
      </div>
    )
  }
}
