import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {Link} from "react-router-dom";
import Snackbar from 'material-ui/Snackbar';
import fire from "../fire";
import './Auth.css';
import {connect} from "react-redux";
import {setEmailText, setPasswordText} from "../store/Auth/actions"

class Auth extends Component {

  constructor(props){
    super(props);
    this.auth = fire.auth();
    this.state =  {

      errMail : null,

      errPass : null,
      error: null,
      open: false,
      emailVerified : false
    }
  }

  componentDidMount(){
  if (this.auth.currentUser != null) {
   this.setState({emailVerified : this.auth.currentUser.emailVerified})
 }
}

  validateMail = () => {
    if (this.state.email === "") {
      throw new Error('Введите вашу элеткронную почту');
    }
    else if (this.state.email.length) {
      this.setState({ errMail : null })
    }
  }

  validatePass = () => {
    if (this.state.pass === "") {
       throw new Error('Введите пароль')
    }
    else if (this.state.pass.length > 0) {
      this.setState({ errPass : null })
    }
  }

  validateVerify = () => {
     if (this.auth.currentUser.emailVerified === false) {
        throw new Error("Подтвердите эмейл")
     }
  }

  singIn = () => {
    const {email, pass} = this.state;
     try {
       this.validateMail();
     }
     catch(err) {
       this.setState({errMail : err.message})
     }
      try {
        this.validatePass();
      }
      catch(err) {
        this.setState({errPass : err.message})
      }

     this.auth.signInWithEmailAndPassword(email, pass)
    .then(() => {
       if (this.auth.currentUser.emailVerified === false) {
         throw new Error('Почта не подверждена')
       }
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
      this.setState({error:err.message}); this.setState({ open: true})
      })
    }

  onChange = event => {
    this.setState({[event.target.name] : event.target.value });
  };

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  render(){
    return (
      <div id = "Wrapper">
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
            errorText = {this.state.errMail}
            value = {this.state.email}
            onChange={this.onChange}
            name = "email"
          />

          <TextField
            errorText = {this.state.errPass}
            value = {this.state.pass}
            onChange={this.onChange}
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

        <Snackbar
          open={this.state.open}
          message = {this.state.error}
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
        />
        </div>
        <div>Вы можете зарегистрироваться <Link to = "/singup">здесь</Link></div>
      </div>
      </div>

    )
  }
}

const mapStateToProps = (state) => {
  return {
    email: state.email,
    pass: state.pass
  }
}

const mapDispatchToProps = {
  setEmailText,
  setPasswordText
}


export default connect(mapStateToProps, mapDispatchToProps)(Auth)
