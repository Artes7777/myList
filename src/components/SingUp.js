import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import SnackbarComponent from './Snackbar';
import Dialog from 'material-ui/Dialog';
import fire from "../fire";
import './Auth.css';
import {connect} from "react-redux";
import { Field, reduxForm, formValueSelector} from 'redux-form';
import {setOpenDialog, setCloseDialog} from "../store/singup/actions";
import {setSnackbarErr, setSnackbarOpen} from '../store/snackbar/actions';


 class SingUp extends Component {

  constructor(props) {
    super(props);
    this.auth = fire.auth();
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(nextProps.email !== this.props.email) {
      return false;
    }
    else if(nextProps.passOne !== this.props.passOne) {
      return false;
    }
    else if(nextProps.passTwo !== this.props.passTwo) {
      return false;
    }
    else if(nextProps.nickName !== this.props.nickName) {
      return false;
    }
    else return true;
  }

  validateMail = (value) => {
    if ( value === "") {
      return 'Введите вашу элеткронную почту';
    }
  }

  validatePassOne = (value) => {
    if (value === undefined || value.length < 6) {
    return 'Пароль должен содержать 6 и более символов'
    }
  }

  validatePasswords = (value, allValues) => {
    if ( value !== allValues.passOne) {
      return 'Пароли не совпадают'
    }
    else if (value === "") {
      return 'Подтвердить пароль'
    }
  }

  singUp = () => {
    const {email, passOne, passTwo} = this.props;

    if (passOne === passTwo) {
      this.auth.createUserWithEmailAndPassword(email, passOne)
      .then(() => {
       setTimeout(() => {this.props.history.push("/auth")}, 5000);
       setTimeout( () => {this.props.setCloseDialog()}, 4000);
      })
      .then(() => {
       this.props.setOpenDialog();
      })
      .then(() => {
        this.auth.currentUser.sendEmailVerification();
      })
      .then(() => {
        this.auth.currentUser.updateProfile({
          displayName: this.props.nickName,
        });
      })
      .catch((err) => {
        if (err.message === "The email address is already in use by another account."){
          err.message = "Пользователь с такой почтой уже зарегистрирован";
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
        this.props.setSnackbarErr(err.message);
        this.props.setSnackbarOpen();
      })
    }
  }

  render(){

    const {handleSubmit} = this.props;

    const renderTextField = ({
      input,
      meta: {touched, error},
    }) => (
      <TextField
        errorText={touched && error}
        {...input}
      />
    )

  const renderTextFieldPass = ({
    input,
    meta: { error, touched },
  }) => (
    <TextField
      type="password"
      errorText={touched && error}
      {...input}
    />
  )

  const renderTextFieldPassTwo = ({
    input,
    meta: { error, touched },
  }) => (
    <TextField
      type="password"
      errorText={touched && error}
      {...input}
    />
  )
    return (
      <div id = "Wraper">
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
        <form onSubmit = {handleSubmit}>
        <div id = "form">
          <Field
            name = "email"
            component = {renderTextField}
            type = 'text'
            validate = {[this.validateMail]}
          />

          <Field
            name = "nickName"
            component = {renderTextField}
          />

          <Field
            name = "passOne"
            component = {renderTextFieldPass}
            validate = {[this.validatePassOne]}
          />

         <Field
           name = "passTwo"
           component = {renderTextFieldPassTwo}
           validate = {[this.validatePasswords]}
         />
         <RaisedButton
           type = "submit"
           style = {{marginTop : "20px"}}
           onClick = {this.singUp}
           label="Зарегистрироваться"
           primary />
        </div>
        </form>
        </div>

        <div id = "button">

       <SnackbarComponent/>

       <Dialog
         title="Проверьте свою почту"
         modal={false}
         open={this.props.openDialog}
         onRequestClose={this.handleClose}
       >Мы отослали вам письмо с подтверждением вашей электронной почты
       </Dialog>
      </div>
      </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    openDialog: state.signup.openDialog,
    email: selector(state, "email"),
    passOne: selector(state, "passOne"),
    passTwo: selector(state, "passTwo"),
    nickName: selector(state, "nickName"),
  }
}

const mapDispatchToProps = {
  setSnackbarErr,
  setSnackbarOpen,
  setOpenDialog,
  setCloseDialog
}

const selector = formValueSelector('registration');

SingUp = (
  reduxForm({
    form: 'registration',
    onSubmit: values => console.log(values),
    initialValues : {
      email : "",
      nickName : "",
      passOne: "",
      passTwo: "",
    }
  })
)(SingUp)


export default connect(mapStateToProps, mapDispatchToProps)(SingUp)
