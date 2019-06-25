import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import './Auth.css';

export default class SingUp extends Component {

  render(){
    return (
      <div id = "Wrapper">
      <div id = "auhtStyle">
        <h1>Регистрация</h1>
        <div>Электронная почта <TextField
        /></div>

        <div>Пароль <TextField
        /></div>

        <div>Подтвердить пароль <TextField
        /></div>

        <RaisedButton
          style = {{marginLeft : "16px"}}
          label="Зарегистрироваться"
          primary />
      </div>
      </div>

    )
  }
}
