import React, { Component } from 'react';
import List from './List.js';
import './App.css';
let tasks =  [ {title: "Buy bread", isdone: false },
               {title: "Clean room", isdone: false},
               {title: "To do home work", isdone: true} ];
class App extends Component {
  render() {
    return ( <List  tasks = {tasks}/>)
     }
}

export default App;
