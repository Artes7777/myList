import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {Link} from "react-router-dom";
import SnackbarComponent from './Snackbar';
import fire from "../fire";
import './Auth.css';
import {connect} from "react-redux";
import {setSnackbarErr, setSnackbarOpen} from '../store/snackbar/actions';
import {setEmailText, setPasswordText, delErrEmail,
        setErrEmail, delErrPass, setErrPass,
        } from "../store/Auth/actions"

class Auth extends Component {

  constructor(props){
    super(props);
    this.auth = fire.auth();
    this.state =  {
      emailVerified : false
    }
  }

  componentDidMount(){
  if (this.auth.currentUser != null) {
   this.setState({emailVerified : this.auth.currentUser.emailVerified})
 }
}

  validateMail = () => {
    if (this.props.email === "") {
      throw new Error('Введите вашу элеткронную почту');
    }
    else if (this.props.email.length) {
      this.props.delErrEmail();
    }
  }

  validatePass = () => {
    if (this.props.pass === "") {
       throw new Error('Введите пароль')
    }
    else if (this.props.pass.length > 0) {
      this.props.delErrPass();
    }
  }

  validateVerify = () => {
     if (this.auth.currentUser.emailVerified === false) {
        throw new Error("Подтвердите эмейл")
     }
  }

  singIn = () => {
    const {email, pass} = this.props;
     try {
       this.validateMail();
     }
     catch(err) {
       this.props.setErrEmail(err.message);
     }
      try {
        this.validatePass();
      }
      catch(err) {
        this.props.setErrPass(err.message);
      }

     this.auth.signInWithEmailAndPassword(email, pass)
    .then(() => {
       this.validateVerify();
    })
    .then(() => {
      this.props.history.push("/")
      })
    .catch((err) => {
      if (err.message === "The email address is badly formatted.") {
        err.message = "Нерправильный логин или пароль"
      }
      if (err.message === "The password is invalid or the user does not have a password." ) {
        err.message = "Нерправильный логин или пароль"
      }
      if (err.message === "There is no user record corresponding to this identifier. The user may have been deleted." ) {
        err.message = "Нерправильный логин или пароль"
      }
      this.props.setSnackbarErr(err.message);
      this.props.setSnackbarOpen();
      })
    }

  onChangeEmail = event => {
    this.props.setEmailText(event.target.value)
  }

  onChangePassword = event => {
    this.props.setPasswordText(event.target.value)
  }

  handleRequestClose = () => {
    this.props.setSnackbarClose();
  };

  render(){
    return (
      <div id = "Wraper">
      <div id = "auhtStyle">
        <h1>Добро пожаловать</h1>
        <div id = "auhtform">
          <div id = "text">
            <div id = "text1">
              <p>Логин</p>
            </div>
            <div id = "text1">
              <p>Пароль</p>
            </div>
          </div>

        <div id = "form">
          <TextField
            errorText = {this.props.errMail}
            value = {this.props.email}
            onChange={this.onChangeEmail}
            name = "email"
          />

          <TextField
            errorText = {this.props.errPass}
            value = {this.props.pass}
            onChange={this.onChangePassword}
            type= "password"
            name = "pass"
          />
        </div>
        </div>

        <div id = "button">
        <RaisedButton
          onClick = {this.singIn}
          style = {{marginLeft : "16px"}}
          label="Войти"
          primary />

        <SnackbarComponent/>
        </div>
        <div>Вы можете зарегистрироваться <Link to = "/singup">здесь</Link></div>
      </div>
      </div>

    )
  }
}

const mapStateToProps = (state) => {
  return {
    email: state.auth.email,
    pass: state.auth.pass,
    errMail: state.auth.errMail,
    errPass: state.auth.errPass,
  }
}

const mapDispatchToProps = {
  setEmailText,
  setPasswordText,
  delErrEmail,
  setErrEmail,
  setErrPass,
  delErrPass,
  setSnackbarErr,
  setSnackbarOpen,
}


export default connect(mapStateToProps, mapDispatchToProps)(Auth)
