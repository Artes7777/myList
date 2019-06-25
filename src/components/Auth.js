import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import {Link} from "react-router-dom"
import './Auth.css';

export default class Auth extends Component {

  render(){
    return (
      <div id = "Wrapper">
      <div id = "auhtStyle">
        <h1>Добро пожаловать</h1>
        <div>Логин <TextField
        /></div>

        <div>Пароль <TextField
        /></div>

        <div>Вы можете зарегистрироваться <Link to = "/singup">здесь</Link></div>
      </div>
      </div>

    )
  }
}
