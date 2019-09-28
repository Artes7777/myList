import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import Dialog from 'material-ui/Dialog';
import fire from "../fire";
import './Auth.css';
import { Field, reduxForm } from 'redux-form';

 class SingUp extends Component {

  constructor(props){
    super(props);
    this.auth = fire.auth();
    this.state =  {
      email : "",
      nickName : "",
      errMail : null,
      passOne: "",
      errpassOne: null,
      passTwo: "",
      errpassTwo: null,
      error: null,
      open: false,
      openDialog: false,
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

  validatePassOne = () => {
    if (this.state.passOne.length < 6) {
       throw new Error('Пароль должен содержать 6 и более символов')
    }
    else if (this.state.passOne.length > 5) {
      this.setState({ errpassOne: null })
    }
  }

  validatePassTwo = () => {
    if (this.state.passTwo === "") {
        throw new Error('Подтвердите пароль')
    }
    else if (this.state.passOne === this.state.passTwo) {
      this.setState({ errpassTwo: null })
    }
  }

  validatePasswords = () => {
    if (this.state.passOne !== this.state.passTwo) {
      throw new Error('Пароли не совпадают')
  }
}

  openDialogWindow = () => {
    this.setState({openDialog: true})
  }

  singUp = () => {
    const {email, passOne} = this.state;

      try { this.validateMail()
      } catch (err) {
      this.setState({errMail : err.message});
      }
      try { this.validatePassOne()
      } catch (err) {
        this.setState({errpassOne : err.message});
      }
      try { this.validatePassTwo()
      } catch (err) {
        this.setState({errpassTwo : err.message});
      }
      try { this.validatePasswords()
      } catch (err) {
        this.setState({error : err.message});
        this.setState({open: true});
      }
      if (this.state.passOne === this.state.passTwo) {
        this.auth.createUserWithEmailAndPassword(email, passOne)
       .then(() => {
         setTimeout(() => {this.props.history.push("/auth")}, 5000);
          })
       .then(() => {
         this.openDialogWindow();
        })
        .then(() => {
          this.auth.currentUser.sendEmailVerification();
        })
        .then(() => {
          this.auth.currentUser.updateProfile({
            displayName: this.state.nickName,
          });
        })
        .catch((err) => {
          if (err.message === "The email address is already in use by another account."){
            err.message = "Такой пользователь уже зарегистрирован";
          }
          else if (err.message === "The email address is badly formatted.") {
            err.message = "Неправильно введена электронная почта"
          }
          else if (err.message === "The password must be 6 characters long or more."){
            err.message = "Пароль должен содержать 6 и более символов"
          }
          else if (err.message === "Password should be at least 6 characters"){
            err.message = "Пароль должен содержать 6 и более символов"
          }
          this.setState({error : err.message}); this.setState({open: true})
        })
      }
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
console.log(this.state.error);
    return (
      <div id = "Wrapper">
      <div id = "auhtStyle">
      <h1>Зарегитрируйтесь</h1>
      <div id = "auhtform">
        <div id = "text">
          <div id = "text1">
          <p>Электронная почта</p>
          </div>
          <div id = "text1">
          <p>Псевдоним</p>
          </div>
          <div id = "text1">
          <p>Пароль</p>
          </div>
          <div id = "text1">
          <p>Подтвердить пароль</p>
          </div>
        </div>
        <form>
        <div id = "form">
          <TextField
            name = "email"
            errorText = {this.state.errMail}
            value = {this.state.email}
            onChange = {this.onChange}
          />

          <TextField
            name = "nickName"
            value = {this.state.nickName}
            onChange = {this.onChange}
          />

         <TextField
            name = "passOne"
            type="password"
            errorText = {this.state.errpassOne}
            value = {this.state.passOne}
            onChange = {this.onChange}
          />

         <TextField
            name = "passTwo"
            type="password"
            errorText = {this.state.errpassTwo}
            value = {this.state.passTwo}
            onChange = {this.onChange}
         />
        </div>
        </form>
        </div>

        <div id = "button">
        <RaisedButton
          style = {{marginLeft : "16px"}}
          onClick = {this.singUp}
          label="Зарегистрироваться"
          primary />


          <Snackbar
         open={this.state.open}
         message = {this.state.error}
         autoHideDuration={4000}
         onRequestClose={this.handleRequestClose}
       />

       <Dialog
         title="Проверьте свою почту"
         modal={false}
         open={this.state.openDialog}
         onRequestClose={this.handleClose}
       >Мы отослали вам письмо с подтверждением вашей электронной почты
       </Dialog>
      </div>
      </div>
      </div>

    )
  }
}

 const RegisrationReduxForm = reduxForm({
  form: 'registration'
})(SingUp)

export default RegisrationReduxForm
