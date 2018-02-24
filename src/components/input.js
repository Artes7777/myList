import React, {Component} from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

export default class Input extends Component {

  static propTypes = {
    addTask : PropTypes.func.isRequired
  }

  constructor(props){
    super(props);
    this.state = {
      value : "",
      error : ""
    } ;
  }

  addTask = (value) => {
    let error = this.props.addTask(value);

    this.setState({
      error : error,
      value : ""
    });
  }

  handleKeypress = (event) => {
    if (event.which === 13) {
      this.addTask (event.target.value);
    }
  }

  changeInputValue = (event) => {
    event.preventDefault ();
    this.setState ( {value : event.target.value} );
  }

  handleBtnClick = () => {
    this.addTask(this.state.value);
  }

  render () {

    const warning = this.state.error;

    return(
      <div>
        <TextField
          value = {this.state.value}
          errorText = {warning}
          onKeyPress = {this.handleKeypress}
          onChange = {this.changeInputValue}
          hintText = "Введите задачу"
          floatingLabelText = "Новая задача"
        />
        <RaisedButton onClick = {this.handleBtnClick} label="Создать" primary />
      </div>
    );
  }
}
