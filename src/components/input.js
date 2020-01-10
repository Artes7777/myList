import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {connect}  from 'react-redux';
import {thunkCreatorAddTask} from '../store/app/actions'

 class Input extends Component {

  constructor(props){
    super(props);
    this.state = {
      value : "",
      error : null,
    } ;
  }

  addTask = (value, numberValue) => {
    const date = this.props.date;
    this.props.thunkCreatorAddTask(value, date, numberValue)
    .then( () => {
      this.setState({
        error : null,
        value : ""
      });
    })
    .catch( (err) => {
      this.setState({ error : err.message});
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
      <div className = "inputContainer">
        <TextField
          value = {this.state.value}
          errorText = {warning}
          onKeyPress = {this.handleKeypress}
          onChange = {this.changeInputValue}
          hintText = "Введите задачу"
          floatingLabelText = "Новая задача"
          style = {{fontSize : '20px'}}
        />
        <RaisedButton
          style = {{marginLeft : "16px"}}
          onClick = {this.handleBtnClick}
          label="Создать"
          primary />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    date: state.date.date
  }
}

const mapDispatchToProps = {
  thunkCreatorAddTask
}

export default connect(mapStateToProps, mapDispatchToProps)(Input)
