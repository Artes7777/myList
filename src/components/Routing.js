import React, {Component} from "react";
import {BrowserRouter, Route, Redirect} from "react-router-dom";
import App from "./App";
import Auth from "./Auth";
import SingUp from "./SingUp";
import Loader from "./Loader";
import fire from "../fire";
import {connect} from 'react-redux';
import {setAutentification, reduceAutentification, reduceLoader} from '../store/userAccess/actions';


 class Routing extends Component {

  constructor(props){
    super(props);
    this.auth = fire.auth();
  }

  componentDidMount(){
    this.auth.onAuthStateChanged((user) => {
      if (user && this.auth.currentUser.emailVerified === true) {
        this.props.setAutentification();
        this.props.reduceLoader()
      }
      else {
        this.props.reduceAutentification();
        this.props.reduceLoader()
      }
    });
  }

  render() {

    const PrivateRoute = ({ component: Component, ...rest }) => {
      return (
        <Route
          {...rest}
          render={props =>
            this.props.isAuthenticated ? (
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
            this.props.isAuthenticated === false ? (
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
      <BrowserRouter>
        {this.props.isloading ? <Loader /> :
        <PrivateRoute exact path ="/" component = {App}/>
        }
        <PrivateRoute1 path ="/auth" component = {Auth}/>
        <Route path ="/singup" component = {SingUp}/>
      </BrowserRouter>
    )
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.isAuthenticated.isAuthenticated,
    isloading: state.isAuthenticated.isloading
  }
}

const mapDispatchToProps = {
  setAutentification,
  reduceAutentification,
  reduceLoader
}

export default connect(mapStateToProps, mapDispatchToProps)(Routing)
