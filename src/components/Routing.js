import React, {Component} from "react";
import {Provider} from 'react-redux';
import {BrowserRouter, Route, Redirect} from "react-router-dom";
import {store} from '../store/redusers';
import App from "./App";
import Auth from "./Auth";
import SingUp from "./SingUp";
import fire from "../fire";


export default class Routing extends Component {

  constructor(props){
    super(props);
    this.auth = fire.auth();
    this.state = {
    isAuthenticated : false
    }
  }

  componentDidMount(){
   this.auth.onAuthStateChanged((user) => {
  if (user && this.auth.currentUser.emailVerified === true) {
   this.setState({isAuthenticated : true})
  }
  else {
    this.setState({isAuthenticated : false})
  }
});
}

  render() {
    console.log(this.state.isAuthenticated)
    const PrivateRoute = ({ component: Component, ...rest }) => {
      return (
        <Route
          {...rest}
          render={props =>
            this.state.isAuthenticated ? (
              <Component {...props} />
            ) : (
              <Redirect
                to={{
                  pathname: "/auth",
                  state: { from: props.location }
                }}
              />
            )
          }
        />
      );
    }

    const PrivateRoute1 = ({ component: Component, ...rest }) => {
      return (
        <Route
          {...rest}
          render={props =>
            this.state.isAuthenticated === false ? (
              <Component {...props} />
            ) : (
              <Redirect
                to={{
                  pathname: "/",
                  state: { from: props.location }
                }}
              />
            )
          }
        />
      );
    }

    return (
      <Provider store = {store}>
      <BrowserRouter>
        <PrivateRoute exact path ="/" component = {App}/>
        <PrivateRoute1 path ="/auth" component = {Auth}/>
        <Route path ="/singup" component = {SingUp}/>
      </BrowserRouter>
      </Provider>
    )
  }
}
