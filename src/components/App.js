import React, { Component } from 'react';
import List from './List.js';
import Input from './input.js';
import Filters from './Filters';
import TaskManager from './TaskManager';
import './App.css';

class App extends Component {
  constructor (props) {
    super (props);
    this.state = {
      tasks : [],
      filter : 'all'
    } ;
    this.taskManager = new TaskManager();
  }

  componentDidMount(){
    this.taskManager.init();
    this.setState({tasks : this.taskManager.getTasks()});
  }

  setFilter = (filter) => {
    this.setState({ filter : filter });
  }

  toggleTask = (id) => {
    this.taskManager.toggleTask(id);
    this.setState ({ tasks : this.taskManager.getTasks() });
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
    this.taskManager.addTask(title);
    this.setState ({
      tasks : this.taskManager.getTasks()
    });
    return "";
  }

  deleteTask = (id) => {
    this.taskManager.deleteTask(id);
    this.setState({ tasks: this.taskManager.getTasks()
    });
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
