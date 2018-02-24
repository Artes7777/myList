import React, { Component } from 'react';
import uuid from 'uuid/v4';
import List from './List.js';
import Input from './input.js';
import Filters from './Filters';
import './App.css';

class App extends Component {
  constructor (props) {
    super (props);
    this.state = {
      tasks : [],
      filter : 'all'
    } ;
  }

  componentDidMount(){
    let tasks = localStorage.getItem('tasks');
    tasks = JSON.parse(tasks);
    if (!tasks) {
      tasks =  [];
    }
    this.setState({tasks : tasks});
  }

  setFilter = (filter) => {
    this.setState({ filter : filter });
  }

  toggleTask = (id) => {
    let tasks_ = this.state.tasks;
    let index = tasks_.findIndex( (task)=> {
      return task.id === id;

    })
    tasks_[index].isdone = !tasks_[index].isdone;
    this.setState ({ tasks : tasks_ });
    localStorage.setItem('tasks', JSON.stringify(tasks_));
  }

  addTask = (title) => {
    if (title === '') {
      return "Введите задачу";
    }
    let isDuplicate = this.state.tasks.some(function(task) {
      return task.title === title;
    });
    if (isDuplicate) {
      return "Такая задача существует";
    }

    let newTask = {
      id: uuid(),
      title: title
    };
    this.state.tasks.push (newTask);
    this.setState ( {
      tasks : this.state.tasks
    } );
    localStorage.setItem('tasks', JSON.stringify(this.state.tasks));
    return "";
  }

  deleteTask = (id) => {
    let index = this.state.tasks.findIndex( (task) => {
      return task.id === id;
    })
    this.state.tasks.splice(index, 1);
    this.setState({ tasks: this.state.tasks});
    localStorage.setItem('tasks', JSON.stringify(this.state.tasks));
  }

  render() {

    let { tasks, filter } = this.state;
    let filteredTasks = tasks.filter( (task)=> {
      switch(filter) {
        case "all" :
          return true;
        case "completed" :
          return task.isdone;
        case "incompleted" :
          return !task.isdone;
        default:
          return true;
      }
    });

    return (
       <div id = "appContainer">
         <h1>Список задач</h1>
         <Input addTask = {this.addTask} />

         <List
           tasks = {filteredTasks}
           deleteTask = {this.deleteTask}
           toggleTask = {this.toggleTask}
         />
         <Filters setFilter = {this.setFilter} />
       </div>
    )
  }
}

export default App;
