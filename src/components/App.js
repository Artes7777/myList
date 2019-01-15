import React, { Component } from 'react';
import List from './List.js';
import Input from './input.js';
import Filters from './Filters';
import TaskManager from './TaskManager';
import MultiplyAct from './MultiplyAct.js';
import './App.css';

class App extends Component {
  constructor (props) {
    super (props);
    this.state = {
      tasks : [],
      filter : 'all',
      selected : new Set(),
      isSelectedAll: false
  };
    this.taskManager = new TaskManager();
  }

  componentDidMount(){
    return this.taskManager.init()
      .then( () => {
        this.setState({tasks : this.taskManager.getTasks()});
      })
    .catch( (err) => {
      console.log(err);
    });
  }

  setFilter = (value) => {
    this.setState({filter : value });
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

  validateAllDeleteCheckbox = () => {
    const {selected} = this.state;
    if (selected.size < 1) {
      this.setState({ isSelectedAll : false });
    }
  }

  deleteTask = (id) => {
    const selected = this.state.selected;
    return this.taskManager.deleteTask(id)
      .then( () => {
        selected.delete(id);
        this.setState({ tasks: this.taskManager.getTasks(),
                        selected: selected});
        this.validateAllDeleteCheckbox();
      })
     .catch( (err) => {
       console.log(err);
     });
  }

  isSelectedInFilter = () => {
    const ids = this.state.selected;
    return this.state.tasks.some( (task) => {
      return ids.has(task.id) && this.isTaskInFilter(task);
    });
  }

  multiplyDeleteTasks = () => {
    const ids = this.state.selected;
    const filteredIds = new Set();
    this.state.tasks.forEach( (task) => {
      if (ids.has(task.id) && this.isTaskInFilter(task)) {
        filteredIds.add(task.id);
        ids.delete(task.id);
      }
    });
    return  this.taskManager.multiplyDelete(filteredIds)
    .then( () => {
      this.setState({ tasks: this.taskManager.getTasks(),
                      selected : ids });
      this.validateAllDeleteCheckbox();
    })
    .catch( (err) => {
      console.log(err);
    });
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

  toggleSelect = (isInputChecked) => {
    this.setState({ isSelectedAll : isInputChecked });
    this.selectAll(isInputChecked)
  }

  isTaskInFilter = (task) => {
    switch(this.state.filter) {
      case "all" :
        return true;
      case "completed" :
        return task.isdone;
      case "incompleted" :
        return !task.isdone;
      default:
        return true;
    }
  }

  filterTasks = () => {
    return this.state.tasks.filter(this.isTaskInFilter);
  }

  render() {
    console.log(this.state.selected);

    const { tasks, filter, selected, isSelectedAll } = this.state;
    const filteredTasks = this.filterTasks();

    const isTaskEmpty = tasks.length < 1;
    const isSelectedEmpty = this.state.selected.size < 1;

    return (
      <div id = "appContainer">
        <h1>Список задач</h1>
        <Input
          addTask = {this.addTask}
        />

        {
          !isTaskEmpty ?
            <MultiplyAct
              toggleSelect = {this.toggleSelect}
              multiplyDeleteTask = {this.multiplyDeleteTasks}
              isSelectedAll = {isSelectedAll}
              isSelectedEmpty = {isSelectedEmpty}
              isSelectedInFilter = {this.isSelectedInFilter()}
            />
            : null
        }
        <List
          tasks = {filteredTasks}
          selected = {selected}
          deleteTask = {this.deleteTask}
          toggleTask = {this.toggleTask}
          selectTask = {this.selectTask}
        />
        <Filters
          filter = {filter}
          setFilter = {this.setFilter}
        />
      </div>
    )
  }
}

export default App;
