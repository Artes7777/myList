import React, { Component } from 'react';
import List from './List.js';
import Input from './input.js';
import Filters from './Filters';
import TaskManager from './TaskManager';
import Checkbox from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import './App.css';

class App extends Component {
  constructor (props) {
    super (props);
    this.state = {
      tasks : [],
      filter : 'all',
      selected : new Set(),
      isSelectedAll : false
    };
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
    return this.taskManager.toggleTask(id)
      .then( () => {
        this.setState({tasks : this.taskManager.getTasks()});
      })
      .catch( (err) => {
        console.log(err);
      });
  }

  addTask = (title) => {
    return this.taskManager.addTask(title)
      .then( () => {
        this.setState ({
          tasks : this.taskManager.getTasks()
        });
      })
      .catch((err) => {
        console.log(err.message);
        throw err;
      });
  }

  deleteTask = (id) => {
    return this.taskManager.deleteTask(id)
      .then( () => {
        this.setState({ tasks: this.taskManager.getTasks()});
      })
     .catch( (err) => {
       console.log(err);
     });
  }

  multiplyDeleteTask = (id) => {
    let ids = this.state.selected;
    this.taskManager.multiplyDelete(ids);
    this.setState({ tasks: this.taskManager.getTasks(),
                    selected : new Set() });
  }

  selectAll = (select) => {
    const {tasks, selected} = this.state;

    tasks.forEach ( (task) => {
      if (select) {
        selected.add(task.id);
      }
      else {
        selected.delete(task.id);
      }
    });

    this.setState({ selected: selected });
  }

  toggleSelect = (event, isInputChecked) => {
    this.setState({ isSelectedAll : isInputChecked });
    this.selectAll(isInputChecked);
  }

  selectTask = (id, checked) => {
    const {selected} = this.state;

    if (checked) {
      selected.add(id);
    }
    else {
      selected.delete(id);
    }
    this.setState({ selected: selected});
  }


  render() {
    console.log(this.state.selected);

    const { tasks, filter, selected, isSelectedAll } = this.state;
    const filteredTasks = tasks.filter( (task)=> {
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

    const isSelectedEmpty = selected.size < 1;
    const isTasksEmpty = tasks.length < 1;

    return (
      <div id = "appContainer">
        <h1>Список задач</h1>
        <Input
          addTask = {this.addTask}
        />

        <Checkbox
          checked = {isSelectedAll}
          label = {isSelectedAll ? "Убрать все" : "Выделить все" }
          disabled={isTasksEmpty}
          onCheck = {this.toggleSelect}/>
        <IconButton disabled={isSelectedEmpty} />
          <ActionDelete onClick = {this.multiplyDeleteTask} color = {isSelectedEmpty ? "grey" : "black" }/>
        <IconButton/>

        <List
          tasks = {filteredTasks}
          selected = {selected}
          deleteTask = {this.deleteTask}
          toggleTask = {this.toggleTask}
          selectTask = {this.selectTask}
        />
        <Filters setFilter = {this.setFilter} />
      </div>
    )
  }
}

export default App;
