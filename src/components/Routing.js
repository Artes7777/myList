import React, {Component} from "react";
import {BrowserRouter, Route} from "react-router-dom";
import App from "./App";
import Auth from "./Auth";
import SingUp from "./SingUp";


export default class Routing extends Component {
  render() {
    return (
      <BrowserRouter>
        <Route exact path ="/" component = {App}/>
        <Route path ="/auth" component = {Auth}/>
        <Route path ="/singup" component = {SingUp}/>
      </BrowserRouter>
    )
  }
}
